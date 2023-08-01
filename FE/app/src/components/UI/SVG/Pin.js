import React from "react";
import "./Pin.css";

const Pin = (props) => {
  return (
    <svg
      className={`pin-icon  ${props.className}`}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      transform="rotate(45)"
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g id="SVGRepo_tracerCarrier"></g>
      <g id="SVGRepo_iconCarrier">
        {" "}
        <path
          d="M6.5 5C6.5 4.44772 6.94772 4 7.5 4H16.5C17.0523 4 17.5 4.44772 17.5 5C17.5 5.55228 17.0523 6 16.5 6H16.095L16.9132 15H19C19.5523 15 20 15.4477 20 16C20 16.5523 19.5523 17 19 17H13V22C13 22.5523 12.5523 23 12 23C11.4477 23 11 22.5523 11 22V17H5C4.44772 17 4 16.5523 4 16C4 15.4477 4.44772 15 5 15H7.08679L7.90497 6H7.5C6.94772 6 6.5 5.55228 6.5 5Z"
          fill="#000000"
        ></path>{" "}
      </g>
    </svg>
  );
};

export default Pin;
