import React, { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";

function Message({ message }) {
  const [minutes, setMinutes] = useState(0);

  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  useEffect(() => {
    const updateMinutes = () => {
      const messageDate = message.date.toDate();
      const currentDate = new Date();
      const timeDifference = Math.floor((currentDate - messageDate) / 60000);
      if (timeDifference > 60) {
        const hour = Math.floor(timeDifference / 60);
        return setMinutes(`${hour} hours ago.`);
      } else if (timeDifference < 1) {
        return setMinutes(`Just now.`);
      } else {
        return setMinutes(`${timeDifference} minutes ago.`);
      }
    };
    updateMinutes();
    const interval = setInterval(updateMinutes, 60000);
    return () => clearInterval(interval);
  }, [message]);

  return (
    <div
      ref={ref}
      className={`message ${message.senderId === currentUser.uid && "owner"}`}
    >
      <div className="messageInfo">
        <img
          src={
            message?.senderId === currentUser.uid
              ? currentUser?.photoURL
              : data?.user?.photoURL
          }
          alt=""
        />
        <span style={{ fontSize: 12, marginTop: 5 }}>{minutes}</span>
      </div>
      <div className={` ${message.text ? "messageContent" : ""} `}>
        <p>{message?.text}</p>
        {message?.img && (
          <img
            src={message?.img}
            alt=""
            style={{
              maxWidth: 200,
              objectFit: "cover",
              borderRadius: 10,
            }}
          />
        )}
      </div>
    </div>
  );
}

export default Message;
