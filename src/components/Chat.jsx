import React, { useContext } from "react";
import Cam from "../img/cam.png";
import Add from "../img/add.png";
import More from "../img/more.png";
import Messages from "./Messages";
import Input from "./Input";
import { ChatContext } from "../context/ChatContext";

function Chat() {
  const { data } = useContext(ChatContext);

  return (
    <div className="chat">
      <div className="chatInfo">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          <img
            src={data?.user?.photoURL}
            alt=""
            style={{
              width: 40,
              height: 40,
              borderRadius: "50%",
              objectFit: "cover",
            }}
          />
          <span>{data?.user?.displayName}</span>
        </div>
        <div className="chatIcons">
          <img src={Cam} alt="" />
          <img src={Add} alt="" />
          <img src={More} alt="" />
        </div>
      </div>
      <Messages />
      <Input />
    </div>
  );
}

export default Chat;
