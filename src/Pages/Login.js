import React, { useState, useRef } from "react";
import {
  getAuth,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import Loader from "../Components/Loader";
import { Link, useNavigate } from "react-router-dom";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import MyToast from "../Components/Toast";
import PassReset from "../Components/PassReset";

function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [visible, setVisible] = useState(false);
  const [modalShow, setModalShow] = useState(false);

  const navigate = useNavigate();

  // console.log(error);
  const auth = getAuth();
  const handleSubmit = (e) => {
    e.preventDefault();
    const password = passwordRef.current.value;
    const email = emailRef.current.value;
    setError("");

    if (!email === undefined && password === undefined && error) {
      setIsLoading(false);
    } else {
      setIsLoading(true);
    }

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user + " successfull");
        // ...

        navigate("/home");
      })
      .catch((err) => {
        console.log(err.message);
        setError(err.message);
        setIsLoading(false);
      });
  };

  const reset = () => {
    const email = emailRef.current.value;
    sendPasswordResetEmail(auth, email)
      .then(() => {
        // Password reset email sent!
        // ..
        console.log(email);
      })
      .catch((error) => {
        const errorMessage = error.message;
        setError(errorMessage);
        console.log(errorMessage);
        // ..
      });
  };

  return (
    <div className="login">
      <form className="details" onSubmit={handleSubmit}>
        <h1>Fiscall LLC</h1>
        <br />
        <h2>Login Page</h2>
        <input
          type="email"
          autoComplete="true"
          name="email"
          required
          ref={emailRef}
          placeholder="Enter your email address  *"
        />
        {visible ? (
          <AiFillEyeInvisible
            onClick={() => setVisible(false)}
            className="eye"
          />
        ) : (
          <AiFillEye onClick={() => setVisible(true)} className="eye" />
        )}
        <input
          type={visible ? "text" : "password"}
          autoComplete="true"
          required
          ref={passwordRef}
          placeholder="Enter your password  *"
        />
        <button>Log In</button>
        <div>
          <p>Don't have an Account?</p>
          <Link to="/register" alt="Registeration">
            Create account
          </Link>
        </div>
        <p onClick={() => setModalShow(true)}>Reset password?</p>
      </form>
      {isLoading && <Loader />}
      {error && <MyToast error={error} />}
      <PassReset
        reset={reset}
        modalShow={modalShow}
        onHide={() => setModalShow(false)}
      />
    </div>
  );
}

export default Login;
