import { useState } from "react";
import Toast from "react-bootstrap/Toast";

function MyToast({ error }) {
  const [showA, setShowA] = useState(true);

  const toggleShowA = () => setShowA(!showA);
  const style = {
    position: "absolute",
    bottom: "10px",
    left: "20px",
    animation: "shake 0.5s",
  };

  return (
    <div style={style}>
      <Toast
        autohide
        delay="3000"
        className="bg-dark"
        show={showA}
        onClose={toggleShowA}
      >
        <Toast.Header>
          <strong className="me-auto">Error message</strong>
          <small>just now</small>
        </Toast.Header>
        <Toast.Body className="text-white">
          {error === "Firebase: Error (auth/invalid-login-credentials)." &&
            "Login failed! Please check your email address and password, and then try again."}
          {error === "Firebase: Error (auth/network-request-failed)." &&
            "Network Error. Please check your internet connection."}
          {error === "Firebase: Error (auth/invalid-email)." &&
            "Enter a valid Email Address."}
          {error === "Firebase: Error (auth/invalid-email)." &&
            "Enter a valid Email Address."}
          {error === "Firebase: Error (auth/email-already-in-use)." &&
            "Email already in use. Please use another email address."} 
          {/* {error ? error: ""} */}
        </Toast.Body>
      </Toast>
    </div>
  );
}

export default MyToast;
