import React, { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Loader from "../Components/Loader";
import MyModal from "../Components/MyModal";
import {
  getAuth,
  onAuthStateChanged,
  signOut,
  browserSessionPersistence,
  setPersistence,
} from "firebase/auth";
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
  // const [searchParams, setSearchParams] = useSearchParams("")

  // const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  function handleClose() {
    setShow(false);
  }
  const auth = getAuth();
  const db = getFirestore(app);

  useEffect(() => {
    
    onAuthStateChanged(auth, (user) => {
      if (user === null) {
        setPersistence(auth, browserSessionPersistence)
          .then(() => {
            // Existing and future Auth states are now persisted in the current
            // session only. Closing the window would clear any existing state even
            // if a user forgets to sign out.
            // ...
            // New sign-in will be persisted with session persistence.
            navigate("/login");
          })
          .catch((error) => {
            // Handle Errors here.
            console.log(error);
          });
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
            // setSearchParams(`${username}:${user.uid}`)
          });
        };
        FetchUser();
      }
    });
  }, [auth, db, navigate]);

  useEffect(() => {
    const setSessionPersistence = async () => {
      try {
        // Check if a user is already logged in
        onAuthStateChanged(auth, async (user) => {
          if (!user) {
            // If no user is logged in, set session persistence
            await setPersistence(auth, browserSessionPersistence);
            // Navigate to the login page
            navigate("/login");
          } else {
            // User is already logged in, no need to change persistence or navigate
            console.log('User is already logged in');
          }
        });
      } catch (error) {
        console.error("Error setting persistence:", error);
      }
    };

    setSessionPersistence();
  }, [auth, navigate]);

  const signout = () => {
    setIsLoading(true);
    handleClose();
    const auth = getAuth();

    setTimeout(() => {
      setIsLoading(true);
      signOut(auth)
        .then(() => {
          // Sign-out successful.
          document.title = "Fiscall LLC";
          setShow(false);
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
  };

  return (
    <div className="home">
      <Navbar signOut={handleShow} />
      <main>
        <Header user={user} />
        <Outlet />
      </main>
      <MyModal
        show={show}
        signout={signout}
        handleClose={handleClose}
        handleShow={handleShow}
      />
      {isLoading && <Loader style={style} />}
    </div>
  );
}

export default Home;
