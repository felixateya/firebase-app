import React, { useState, useRef } from "react";
import {
  getAuth,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import Loader from "../Components/Loader";
import { Link, useNavigate } from "react-router-dom";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
// import MyToast from "../Components/Toast";
import { app } from "../Firebase";
import PassReset from "../Components/PassReset";
import toast, { Toaster } from "react-hot-toast";
import logo from "../assets/logo.svg";

function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [visible, setVisible] = useState(false);
  const [modalShow, setModalShow] = useState(false);

  const navigate = useNavigate();

  // console.log(error);
  const auth = getAuth(app);
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
        toast.success("Signed in successfully");
        navigate("/");
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err.message);
        setError(err.message);
        toast.error(err.message.split(" ")[2].replace("auth/", ""));
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
        toast.error(errorMessage);
        console.log(errorMessage);
        // ..
      });
  };

  return (
    <div className="login">
      <div className="addition">
        <h1>Fiscall LLC</h1>
      </div>
      <form className="form" id='login-form' name='login-form' onSubmit={handleSubmit}>
        <img src={logo} alt="logo" />
        <h2>Log In</h2>
        <input
          type="email"
          autoFocus
          autoComplete="true"
          name="email"
          id="email"
          required
          ref={emailRef}
          placeholder="Enter your email address"
        />
        <div className="visible-eye">
        <input
            type={visible ? "text" : "password"}
            autoComplete="true"
            required
            ref={passwordRef}
            id='password'
            placeholder="Enter your password"
          />
          <h6>
          {visible ? (
            
            <AiFillEyeInvisible
              onClick={() => setVisible(false)}
              className="eye"
            />
          ) : (
            <AiFillEye onClick={() => setVisible(true)} className="eye" />
          )}
          </h6>
          
        </div>
        <button>Log In</button>
        <div>
          <p>Don't have an Account?</p>
          <Link to="/register" alt="Registration">
            Create account
          </Link>
        </div>
        <p onClick={() => setModalShow(true)}>Reset password?</p>
      </form>

      {isLoading && <Loader />}
      {/* {error && <MyToast error={error} />} */}
      <Toaster position="top-right" reverseOrder={false} />
      <PassReset
        reset={reset}
        modalShow={modalShow}
        onHide={() => setModalShow(false)}
      />
    </div>
  );
}

export default Login;
