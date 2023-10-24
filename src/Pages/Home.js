import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Loader from "../Components/Loader";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import {
  getDocs,
  collection,
  getFirestore,
  where,
  query,
} from "firebase/firestore";
import { app } from "../Firebase";
// import Dashboard from './Dashboard'
function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState("");
  const navigate = useNavigate();

  const auth = getAuth();
  const db = getFirestore(app);



  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // const UserId = user.uid;

        const FetchUser = async () => {
          const queryDocument = query(
            collection(db, "Users"),
            where("userId", "==", user.uid)
          );
          const querySnapShot = await getDocs(queryDocument);
          querySnapShot.forEach((userDoc) => {
          const username = userDoc.data().userName
          
          setUser(username)
          });
        };
        FetchUser();
      }else{
        navigate("/Login")
        // document.title = "Firebase App"
      }
    });
    
  });


  

  const signout = () => {
    setIsLoading(true);

    const auth = getAuth();

    setTimeout(() => {
      setIsLoading(true)
      signOut(auth)
      .then(() => {
        // Sign-out successful.

        navigate("/");
      })
      .catch((error) => {
        // An error happened.
      });
        }, 1500);
    
    // setTimeout( ()=>{
    //   navigate("/");
    // }, 3000)
  };

const style = {
  backgroundColor: "transparent",
  width: "80%"
}

  return (
    <div className="home">
      <Navbar user={user} signOut={signout}/>
      <div className="main">
      <h1>Welcome {user}</h1>
      {/* <Dashboard/> */}
        {isLoading && <Loader style={style} />}
      </div>
    </div>
  );
}

export default Home;
