import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { AuthContext } from "../context/AuthContext";

function Login() {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  if (currentUser) {
    navigate("/");
  }
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (error) {
      setError(true);
      console.log(error);
    }
    setLoading(false);
  };
  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">Lama Chat</span>
        <span className="title">Login</span>
        <form onSubmit={handleSubmit}>
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />

          <button disabled={loading} className="btn">
            Login
          </button>
          {error && <span className="error">Something went wrong! </span>}
        </form>
        <p>
          You don't have an account?{" "}
          <Link
            to="/register"
            style={{
              textDecoration: "underline",
              fontWeight: "bold",
            }}
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
