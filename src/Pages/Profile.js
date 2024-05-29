import React, { useState, useEffect } from "react";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  getStorage,
} from "firebase/storage";
import { getAuth } from "firebase/auth";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  updateDoc,
  getFirestore,
} from "firebase/firestore";
import { app } from "../Firebase";
import toast, { Toaster } from "react-hot-toast";
import { Form, ProgressBar } from "react-bootstrap";

const Profile = ({setProfile, profile}) => {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [user, setUser] = useState(null);
  const db = getFirestore(app);
  const storage = getStorage(app);
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);
      }
    });

    return () => unsubscribe();
  }, [auth]);

  const handleUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) {
      toast.error("Please select an image...");
      return;
    }

    if (!user) {
      toast.error("User not authenticated.");
      return;
    }

    setUploading(true);

    const storageRef = ref(storage, "Profile/" + Math.random() + file.name);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progress);
        console.log("Upload is " + progress + "% done");
      },
      (error) => {
        console.error("Upload failed:", error.message);
        toast.error("Upload failed. Please try again.");
        setUploading(false);
      },
      async () => {
        try {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          await updateProfileImage(downloadURL);
        } catch (error) {
          console.error("Failed to update profile image:", error.message);
          toast.error("Failed to update profile image. Please try again.");
        } finally {
          setUploading(false);
        }
      }
    );
  };

  const updateProfileImage = async (downloadURL) => {
    try {
      console.log("Updating profile image for user UID:", user.uid);
      const usersRef = collection(db, "Users");
      const queryDocument = query(usersRef, where("userId", "==", user.uid));
      const querySnapshot = await getDocs(queryDocument);

      console.log("Query Snapshot: ", querySnapshot);

      if (!querySnapshot.empty) {
        const userDoc = querySnapshot.docs[0];
        const userDocRef = doc(db, "Users", userDoc.id);

        await updateDoc(userDocRef, {
          profileImage: downloadURL,
        });

        toast.success("Profile image updated successfully!");
        // window.location.reload();
        setProfile(downloadURL)
      } else {
        console.error("User document not found for UID:", user.uid);
        toast.error("User document not found.");
      }
    } catch (error) {
      console.error("Error querying user document:", error.message);
      toast.error("Error querying user document. Please try again.");
    }
  };

  return (
    <div className="profile-page">
      <Form.Control
        type="file"
        id="profileImage"
        onChange={handleUpload}
        disabled={uploading}
      />
      {uploading && <ProgressBar striped now={progress} label={`${progress}%`}></ProgressBar>}
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};

export default Profile;
