import React, { useState } from "react";
import Rating from "@mui/material/Rating";
import "./RatingStar.css";
import { styled } from "@mui/material/styles";

const RatingStar = (props) => {
  const [value, setValue] = useState(props.value);
  const onChange = (e, newValue) => {
    setValue(newValue);
    props.onChange();
  };

  return (
    <Rating
      name="rating"
      value={props.value}
      defaultValue={-1}
      precision={0.5}
      // onChange={onChange}
      style={{ direction: "ltr" }}
      readOnly={props.readOnly}
    />
  );
};
export default RatingStar;
