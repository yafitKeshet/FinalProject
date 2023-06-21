import React from "react";
import "./Jobs.css";
import Job from "./Job";

const Jobs = (props) => {
  return <Job user={props.user}>משרות</Job>;
};
export default Jobs;
