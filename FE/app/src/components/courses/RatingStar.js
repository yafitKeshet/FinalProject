import React from "react";
import Rating from "@mui/material/Rating";
import "./RatingStar.css";
import { styled } from "@mui/material/styles";

const labels = {
  0.5: "Useless",
  1: "Useless+",
  1.5: "Poor",
  2: "Poor+",
  2.5: "Ok",
  3: "Ok+",
  3.5: "Good",
  4: "Good+",
  4.5: "Excellent",
  5: "Excellent+",
};

const RatingStar = (props) => {
  const [value, setValue] = React.useState(-1);
  const onChange = (e, newValue) => {
    setValue(newValue);
    props.onChange();
  };

  return (
    <Rating
      name="rating"
      value={value}
      onChange={onChange}
      style={{ direction: "ltr" }}
    />
  );
};
export default RatingStar;
