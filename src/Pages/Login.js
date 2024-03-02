import React, { useState, useRef } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import Loader from "../Components/Loader";
import { Link, useNavigate } from "react-router-dom";
import { app } from "../Firebase";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [visible, setVisible] = useState(false);

  const navigate = useNavigate();

  const signin = () => {
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    setError("");

    const auth = getAuth();
    if (!email && !password && error) {
      setIsLoading(false);
      // console.log(error);
    } else {
      setIsLoading(true);
    }

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log("successfull");
        // ...

        navigate("/home");
      })
      .catch((err) => {
        console.log(err.message);
        setError(err.message);
        setIsLoading(false);
      });

    // setIsLoading(true)
    // setTimeout( ()=>{
    //   navigate("/Home");
    // }, 3000)
  };

  // console.log(error);
  const handleSubmit = (e) => {
    e.preventDefault();
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
          required
          ref={emailRef}
          placeholder="Enter your email address  *"
        />
        { visible ? <AiFillEyeInvisible onClick={()=> setVisible(false)} className="eye" />  : <AiFillEye onClick={()=> setVisible(true)} className="eye" />
            
          
        }
        <input
          type={visible ? "text" : "password"}
          autoComplete="true"
          required
          ref={passwordRef}
          placeholder="Enter your password  *"
        />
        {error && (
          <p className="error">
            {error === "Firebase: Error (auth/invalid-login-credentials)." &&
              "Login failed! Please check your email address and password, and then try again."}
            {error === "Firebase: Error (auth/network-request-failed)." &&
              "Network Error. Please check your internet connection."}
            {error === "Firebase: Error (auth/invalid-email)." &&
              "Enter a valid Email Address."}
          </p>
        )}
        <button onClick={signin}>Log In</button>
        <div>
          <p>Don't have an Account?</p>
          <Link to="/register" alt="Registeration">
            Sign Up.
          </Link>
        </div>
      </form>
      {isLoading && <Loader />}
    </div>
  );
}

export default Login;
