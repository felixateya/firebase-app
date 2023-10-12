import React, {useState, useRef} from 'react'
import {getAuth, signInWithEmailAndPassword} from 'firebase/auth'
import Loader from "../Components/Loader";
import { Link, useNavigate } from "react-router-dom";
import {app} from '../Firebase'
function Login() {

  const emailRef = useRef()
  const passwordRef = useRef()
  const [isLoading, setIsLoading] = useState(false)

  const navigate = useNavigate()

  const signin = ()=>{
    const email = emailRef.current.value
    const password =  passwordRef.current.value


    const auth = getAuth();
if(!email && !password){
  setIsLoading(false)
} else{
  setIsLoading(true)
}
    

    signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    console.log("successfull")
    // ...
    
    navigate('/')
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorMessage)
  });

    // setIsLoading(true)
    // setTimeout( ()=>{
    //   navigate("/Home");
    // }, 3000)


  }

  const handleSubmit = (e)=>{
    e.preventDefault()
  }

  return (
    <div className='login'>
        <form className="details" onSubmit={handleSubmit}>
        <h2>Login Page</h2>
            <input type="email" ref={emailRef}   placeholder='Enter your email address'/>
            <input type="password" ref={passwordRef}  placeholder='Enter your password'/>
            <button onClick={signin}>Log In</button>
            <div>
            <p>Don't have an Account?</p>
            <Link to="/Register" alt="Registeration">Sign Up.</Link>
        </div>
        </form>
        {isLoading && <Loader/>}
    </div>
  )
}

export default Login