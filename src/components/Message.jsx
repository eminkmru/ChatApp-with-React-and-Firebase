import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";

function Message({ message }) {
  console.log(message);

  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  return (
    <div className="message owner ">
      {/* <div className="messageInfo">
        <img
          src={}
          alt=""
        />
        <span style={{ fontSize: 12, marginTop: 5 }}>Just Now</span>
      </div>
      <div className="messageContent">
        <p>Hello</p>
        <img
          src="https://img.freepik.com/free-photo/young-beautiful-woman-pink-warm-sweater-natural-look-smiling-portrait-isolated-long-hair_285396-896.jpg"
          alt=""
        />
      </div> */}
    </div>
  );
}

export default Message;
