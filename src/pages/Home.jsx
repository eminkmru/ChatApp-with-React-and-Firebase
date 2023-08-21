import React, { useContext } from "react";
import Sidebar from "../components/Sidebar";
import Chat from "../components/Chat";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Home() {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  if (!currentUser) {
    navigate("/login");
  }

  return (
    <div className="home">
      <div className="container">
        <Sidebar />
        <Chat />
      </div>
    </div>
  );
}

export default Home;
