import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import React, { useState, useRef } from "react";
import Loader from "../Components/Loader";
import { Link, useNavigate } from "react-router-dom";
import { doc, setDoc, collection, getFirestore } from "firebase/firestore";
import { app } from "../Firebase";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
// import MyToast from "../Components/Toast";
import toast, { Toaster } from "react-hot-toast";
import logo from '../assets/logo.svg';

function Register() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const nameRef = useRef();

  const [isLoading, setIsLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const db = getFirestore(app);

  const handleSubmit = (e) => {
    e.preventDefault();
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
            profileImage: 'https://firebasestorage.googleapis.com/v0/b/react-firebase-1bcaa.appspot.com/o/user.png?alt=media&token=66b0522e-814a-47e7-be8e-99e8d3485860'
          })
            .then(() => {
              navigate("/");
            })
            .catch((err) => {
              // const errorCode = err.code;
              // setError(err.message)
              // ..
            });

          // ...
        })
        .catch((err) => {
          toast.error(err.message.split(' ')[2]);
          setError(err.message);
          console.log(err.message);
          setIsLoading(false);
          // ..
        });
    }
  };

  return (
    <div className="register">
      <form className="form" id="signup-form" name="signup-form" onSubmit={handleSubmit}>
      <img src={logo} alt="logo"/>
        <h2>Create Account</h2>

        <input
          type="text"
          autoComplete="true"
          ref={nameRef}
          autoFocus
          placeholder="Enter your full name"
          required
          id="name"
        />
        <input
          type="email"
          autoComplete="true"
          ref={emailRef}
          placeholder="Enter your email address"
          required
          id="email"
        />
        <div className="visible-eye">
        <input
          type={visible ? "text" : "password"}
          ref={passwordRef}
          placeholder="Set your password"
          required
          autoComplete="true"
          id="password"
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
        <button>Create Account</button>
        <div>
          <p>Already a User?</p>
          <Link to="/login" alt="Registeration">
            Sign In.
          </Link>
        </div>
      </form>
      <div className="addition">
      <h1>Fiscall LLC</h1>
      </div>
      {isLoading && <Loader />}
      {/* {error && <MyToast error = {error} />} */}
      <Toaster position="bottom-left" reverseOrder={false} />
    </div>
  );
}

export default Register;
