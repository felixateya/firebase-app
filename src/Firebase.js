// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// My web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAjXQyQIMSSnTeXR4KP00Y0P5elOQBpBME",
  authDomain: "react-firebase-1bcaa.firebaseapp.com",
  projectId: "react-firebase-1bcaa",
  storageBucket: "react-firebase-1bcaa.appspot.com",
  messagingSenderId: "581581351821",
  appId: "1:581581351821:web:0a40865dfc39838fddebc4",
  measurementId: "G-6NYMDCCF7C"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export {app}
export{analytics}