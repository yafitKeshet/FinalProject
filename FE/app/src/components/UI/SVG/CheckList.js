import React from "react";
import "./CheckList.css";

const CheckList = (props) => {
  return (
    // <svg
    //   className={`checklist-icon  ${props.className}`}
    //   width="800px"
    //   height="800px"
    //   viewBox="0 0 24 24"
    //   fill="none"
    //   xmlns="http://www.w3.org/2000/svg"
    // >
    //   <g id="Edit / List_Checklist">
    //     <path
    //       id="Vector"
    //       d="M11 17H20M8 15L5.5 18L4 17M11 12H20M8 10L5.5 13L4 12M11 7H20M8 5L5.5 8L4 7"
    //       stroke="#000000"
    //     />
    //   </g>
    // </svg>

    <svg
      className={`checklist-icon  ${props.className}`}
      viewBox="-2.4 -2.4 28.80 28.80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0">
        <rect
          x="-2.4"
          y="-2.4"
          width="28.80"
          height="28.80"
          rx="14.4"
          fill="       #3873a3"
          strokeWidth="0"
        ></rect>
      </g>
      <g id="SVGRepo_tracerCarrier"></g>
      <g id="SVGRepo_iconCarrier">
        {" "}
        <g id="Edit / List_Checklist">
          {" "}
          <path
            id="Vector"
            d="M11 17H20M8 15L5.5 18L4 17M11 12H20M8 10L5.5 13L4 12M11 7H20M8 5L5.5 8L4 7"
            stroke="#000000"
            strokeWidth="1.6320000000000001"
          ></path>{" "}
        </g>{" "}
      </g>
    </svg>
  );
};

export default CheckList;
