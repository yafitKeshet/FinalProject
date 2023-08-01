import React, { useState } from "react";
import Rating from "@mui/material/Rating";
import "./RatingStar.css";

const RatingStar = (props) => {
  const [value, setValue] = useState(props.value);
  console.log(props.value);

  const onChange = (e, newValue) => {
    // console.log("new val", newValue);
    setValue(newValue);
    props.onChange(newValue);
  };
  // console.log("val", value);

  return (
    <Rating
      className={props.className}
      name="rating"
      value={props.readOnly ? props.value : value}
      // defaultValue={-1}
      // precision={1}
      onChange={onChange}
      style={{ direction: "ltr" }}
      readOnly={props.readOnly}
    />
  );
};
export default RatingStar;
