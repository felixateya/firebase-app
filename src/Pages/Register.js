import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import React, { useState, useRef } from "react";
import Loader from "../Components/Loader";
import { Link, useNavigate } from "react-router-dom";
import { doc, setDoc, collection, getFirestore } from "firebase/firestore";
import { app } from "../Firebase";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import MyToast from "../Components/Toast";

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
          setError(err.message);
          console.log(err.message)
          setIsLoading(false)
          // ..
        });
    }

  };
  return (
    <div className="register">
      <form className="register-form" onSubmit={handleSubmit}>
        <h1>Fiscall LLC</h1>
        <br/>
        <h2>Create Account</h2>
        <input
          type="text"
          autoComplete="true"
          ref={nameRef}
          placeholder="Enter your full name *"
          required
        />
        <input
          type="email"
          autoComplete="true"
          ref={emailRef}
          placeholder="Enter your email address *"
          required
        />
        { visible ? <AiFillEyeInvisible onClick={()=> setVisible(false)} className="eye-login regis" />  : <AiFillEye onClick={()=> setVisible(true)} className="eye-login regis" />
            
          
          }
        <input
          type={visible ? "text" : "password"}
          ref={passwordRef}
          placeholder="Set your password *"
          required
          autoComplete="true"
        />
        <button>Create Account</button>
        <div>
          <p>Already a User?</p>
          <Link to="/login" alt="Registeration">
            Sign In.
          </Link>
        </div>
      </form>
      {isLoading && <Loader />}
      {error && <MyToast error = {error} />}
    </div>
  );
}

export default Register;
