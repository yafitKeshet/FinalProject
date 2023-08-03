import React from "react";
import "./Send.css";

const Send = (props) => {
  return (
    <svg
      className={`send-icon  ${props.className}`}
      fill="#ffffff"
      viewBox="0 0 32 32"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      stroke="#ffffff"
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g id="SVGRepo_tracerCarrier"></g>
      <g id="SVGRepo_iconCarrier">
        {" "}
        <title>send-envelope</title>{" "}
        <path d="M0 25.984v-12q0-2.464 1.76-4.224t4.256-1.76h0.352l0.096 0.288q0.544 1.344 1.344 2.176t2.208 1.184v0.352h-4q-0.672 0-1.28 0.48l11.264 7.52 11.264-7.52q-0.576-0.48-1.248-0.48h-4v-0.352q1.376-0.384 2.176-1.184t1.344-2.176l0.096-0.288h0.384q2.464 0 4.224 1.76t1.76 4.224v12q0 2.496-1.76 4.256t-4.224 1.76h-20q-2.496 0-4.256-1.76t-1.76-4.256zM4 23.968l6.016-1.984-5.408 5.408q0.544 0.608 1.408 0.608h20q0.8 0 1.408-0.608l-5.408-5.408 5.984 2.016v-8.032l-12 8-12-8v8zM10.048 5.632q0.096-0.608 0.544-1.056l4-4q0.576-0.576 1.408-0.576t1.408 0.576l4 4q0.448 0.448 0.544 1.056t-0.096 1.152q-0.224 0.544-0.736 0.896t-1.12 0.32h-1.984v6.016q0 0.832-0.608 1.408t-1.408 0.576-1.408-0.576-0.576-1.408v-6.016h-2.016q-0.608 0-1.12-0.32t-0.736-0.896-0.096-1.152z"></path>{" "}
      </g>
    </svg>
  );
};

export default Send;