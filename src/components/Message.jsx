import React from "react";

function Message() {
  return (
    <div className="message owner">
      <div className="messageInfo">
        <img
          src="https://media.istockphoto.com/id/1289220545/photo/beautiful-woman-smiling-with-crossed-arms.jpg?b=1&s=612x612&w=0&k=20&c=V0w97TpL-tuD3vdWC6AcD_nLE4BiAEN12mJdVZGw51g="
          alt=""
        />
        <span>Just Now</span>
      </div>
      <div className="messageContent">
        <p>Hello</p>
        <img
          src="https://media.istockphoto.com/id/1289220545/photo/beautiful-woman-smiling-with-crossed-arms.jpg?b=1&s=612x612&w=0&k=20&c=V0w97TpL-tuD3vdWC6AcD_nLE4BiAEN12mJdVZGw51g="
          alt=""
        />
      </div>
    </div>
  );
}

export default Message;
