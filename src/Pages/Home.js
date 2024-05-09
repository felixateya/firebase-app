import React, { useState, useEffect } from "react";
import { Outlet, useNavigate,} from "react-router-dom";
import Navbar from "../Components/Navbar";
import Loader from "../Components/Loader";
import MyModal from "../Components/MyModal";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import {
  getDocs,
  collection,
  getFirestore,
  where,
  query,
} from "firebase/firestore";
import { app } from "../Firebase";
import Header from "../Components/Header";

function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState("");
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  // const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
function handleClose () {
  setShow(false)
}
  const auth = getAuth();
  const db = getFirestore(app);
  
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user === null) {
        navigate("/login");
      } else {
        // const UserId = user.uid;
        
        const FetchUser = async () => {
          const queryDocument = query(
            collection(db, "Users"),
            where("userId", "==", user.uid)
            );
            const querySnapShot = await getDocs(queryDocument);
            querySnapShot.forEach((userDoc) => {
            const username = userDoc.data().userName;
            document.title = `Fiscall LLC | ${username}`;
            setUser(username);
          });
        };
        FetchUser();
      }
    });
  }, [auth, db, navigate]);

  const signout = () => {
    setIsLoading(true);
handleClose()
    const auth = getAuth();

    setTimeout(() => {
      setIsLoading(true);
      signOut(auth)
        .then(() => {
          // Sign-out successful.
          document.title = "Fiscall LLC";
        setShow(false)
          navigate("/login");
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
    backgroundColor: "#926049a2",
    width: "100%",
  };

  
  

  return (
    <div className="home">
      <Navbar   signOut={handleShow} />
      <main>
      <Header user={user}/>
      <Outlet/>
        {isLoading && <Loader style={style} />}
      <MyModal show={show} signout={signout} handleClose={handleClose} handleShow={handleShow}/>
      </main>
    </div>
  );
}

export default Home;
