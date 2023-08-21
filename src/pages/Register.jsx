import React, { useContext, useState } from "react";
import Add from "../img/addAvatar.png";

import { doc, setDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, storage, db } from "../firebase";

import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Register() {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  if (currentUser) {
    navigate("/");
  }

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);

      const storageRef = ref(storage, displayName);

      // Yükleme görevini başlat ve promise'ını al
      const uploadTask = uploadBytesResumable(storageRef, file);

      // Yükleme tamamlandığında URL'yi al
      const snapshot = await uploadTask;

      const downloadURL = await getDownloadURL(snapshot.ref);

      await updateProfile(res.user, {
        displayName,
        photoURL: downloadURL,
      });

      await setDoc(doc(db, "users", res.user.uid), {
        uid: res.user.uid,
        displayName,
        email,
        photoURL: downloadURL,
      });

      await setDoc(doc(db, "userChats", res.user.uid), {});

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
        <span className="title">Register</span>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Display Name" />
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <input type="file" id="file" style={{ display: "none" }} />
          <label htmlFor="file">
            <img src={Add} alt="" />
            Add an avatar
          </label>

          <button className="btn" disabled={loading}>
            Register
          </button>
          {error && <span className="error">Something went wrong!</span>}
        </form>
        <p>
          You do have an account?
          <Link
            to="/login"
            style={{ textDecoration: "underline", fontWeight: "bold" }}
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
