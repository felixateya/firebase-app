import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth'
import React, {useState, useRef} from 'react'
import Loader from "../Components/Loader";
import { Link, useNavigate } from "react-router-dom";
import {
  doc,
  setDoc,
  collection,
  getFirestore,
} from "firebase/firestore";
import {app} from '../Firebase'

function Register() {

  const emailRef = useRef()
  const passwordRef = useRef()
  const nameRef = useRef()

  const [isLoading, setIsLoading] = useState(false)

const navigate= useNavigate()
const db = getFirestore(app);

const create =()=>{

  const email = emailRef.current.value
    const password = passwordRef.current.value
    const name = nameRef.current.value

    const auth = getAuth();
    
    if(!email && !password){
  setIsLoading(false)
} else{
  setIsLoading(true)
}


    createUserWithEmailAndPassword(auth, email, password, name)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user.uid;
    const newUser = doc(collection(db, "Users"));
    setDoc(newUser,{
      userId: user,
      userName: name,
      userEmail: email,
    }).then(()=>{
      navigate('/')
    }).catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorMessage)
    // ..
  });
    
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorMessage)
    // ..
  });

  // setIsLoading(true)
  //   setTimeout( ()=>{
  //     navigate("/Home");
  //   }, 3000)
}

  return (
    <div className="register">
      <div className="details">
        <h2>Create Account</h2>
        <input type="text" ref={nameRef} placeholder="Enter your full name" />
        <input type="email" ref={emailRef} placeholder="Enter your email address" />
        <input type="password" ref={passwordRef} placeholder="Set your password" />
        <button onClick= {create}>Create Account</button>
        <div>
            <p>Already a User?</p>
            <Link to="/Login" alt="Registeration">Sign In.</Link>
        </div>
      </div>
      {isLoading && <Loader/>}
    </div>
  );
}

export default Register;
