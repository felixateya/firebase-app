import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import React, { useState, useRef } from "react";
import Loader from "../Components/Loader";
import { Link, useNavigate } from "react-router-dom";
import { doc, setDoc, collection, getFirestore } from "firebase/firestore";
import { app } from "../Firebase";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

function Register() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const nameRef = useRef();

  const [isLoading, setIsLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const db = getFirestore(app);

  const create = () => {
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const name = nameRef.current.value;

    const auth = getAuth();
    // setError("");

    if (!email && !password && !name && error) {
      setIsLoading(false);
    } else {
      setIsLoading(true);
      createUserWithEmailAndPassword(auth, email, password, name)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user.uid;
          const newUser = doc(collection(db, "Users"));
          setDoc(newUser, {
            userId: user,
            userName: name,
            userEmail: email,
          })
            .then(() => {
              navigate("/Home");
            })
            .catch((err) => {
              // const errorCode = err.code;
              // setError(err.message)
              
              // ..
            });

          // ...
        })
        .catch((err) => {
          setError(err.message);
          console.log(err.message
          setIsLoading(false)
          // ..
        });
    }

    // setIsLoading(true)
    //   setTimeout( ()=>{
    //     navigate("/Home");
    //   }, 3000)
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  // console.log(error);
  return (
    <div className="register">
      <form className="details" onSubmit={handleSubmit}>
        <h1>Fiscall LLC</h1>
        <br/>
        <h2>Create Account</h2>
        <input
          type="text"
          ref={nameRef}
          placeholder="Enter your full name *"
          required
        />
        <input
          type="email"
          ref={emailRef}
          placeholder="Enter your email address *"
          required
        />
        { visible ? <AiFillEyeInvisible onClick={()=> setVisible(false)} className="eye regis" />  : <AiFillEye onClick={()=> setVisible(true)} className="eye regis" />
            
          
          }
        <input
          type={visible ? "text" : "password"}
          ref={passwordRef}
          placeholder="Set your password *"
          required
        />
        {error && (
          <p className="error reg">
            {error === "Firebase: Error (auth/invalid-login-credentials)." &&
              "Login failed! Please check your email address and password, and then try again."}
            {error === "Firebase: Error (auth/network-request-failed)." &&
              "Network Error. Please check your internet connection."}
            {error === "Firebase: Error (auth/invalid-email)." &&
              "Enter a valid Email Address."}
          </p>
        )}
        <button onClick={create}>Create Account</button>
        <div>
          <p>Already a User?</p>
          <Link to="/" alt="Registeration">
            Sign In.
          </Link>
        </div>
      </form>
      {isLoading && <Loader />}
    </div>
  );
}

export default Register;
