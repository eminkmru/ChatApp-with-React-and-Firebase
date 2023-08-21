import { signOut } from "firebase/auth";
import React, { useContext } from "react";
import { auth } from "../firebase";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const { currentUser } = useContext(AuthContext);

  const navigate = useNavigate();

  return (
    <div className="navbar">
      <span className="logo">Lama Chat</span>
      <div className="user">
        <img
          src={
            currentUser?.photoURL
              ? currentUser?.photoURL
              : "https://i.imgur.com/6VBx3io.png"
          }
          alt=""
        />
        <span>{currentUser?.displayName}</span>
        <button
          onClick={() => {
            signOut(auth);
            navigate("/login");
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Navbar;
