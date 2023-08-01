import React from "react";
import "./Circle.css";

const Circle = (props) => {
  return (
    <svg
      className={`circle-icon ${props.className}`}
      width="800px"
      height="800px"
      viewBox="0 0 1024 1024"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>circle</title>
      <circle cx="512" cy="512" r="256" fill="#000000" />
    </svg>
  );
};

export default Circle;
