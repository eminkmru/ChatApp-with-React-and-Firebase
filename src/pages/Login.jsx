import React, { useState } from "react";
import Add from "../img/addAvatar.png";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

const Login = () => {
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    setLoading(true);

    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      await signInWithEmailAndPassword(auth, email, password)
        .then(() => {
          navigate("/");
        })
        .catch((error) => {
          setError(true);
          console.log(error.message);
          debugger;
          if (error.message === "Firebase: Error (auth/user-not-found).") {
            setErrorMessage("User not found.");
          } else if (
            error.message === "Firebase: Error (auth/wrong-password)."
          ) {
            setErrorMessage("Wrong password.");
          } else if (
            error.message === "Firebase: Error (auth/invalid-email)."
          ) {
            setErrorMessage("Invalid email.");
          } else if (
            error.message ===
            "Firebase: Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later. (auth/too-many-requests)."
          ) {
            setErrorMessage(
              "Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later."
            );
          } else {
            setErrorMessage("Something went wrong.");
          }
        });
    } catch (error) {
      setError(true);
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">Lama Chat</span>
        <span className="title">Sign In</span>
        <form onSubmit={handleSubmit}>
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <button disabled={loading}>Sign In</button>
          {error && (
            <span
              className="error"
              style={{
                fontSize: "14px",
                textAlign: "center",
                marginTop: "5px",
                color: "red",
                fontWeight: "700",
                maxWidth: "250px",
              }}
            >
              {errorMessage}
            </span>
          )}
        </form>
        <p>
          You don't have an account?
          <Link
            to="/register"
            style={{ textDecoration: "none", fontWeight: "700" }}
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
