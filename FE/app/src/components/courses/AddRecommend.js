import React, { useState } from "react";
import Card from "../UI/Card";
import "./AddRecommend.css";
import Cancel from "../UI/SVG/Cancel";
import Separator from "../UI/Separator";
import Button from "../UI/Button";
import RatingStar from "./RatingStar";

import { getConfig } from "../user/user.ts";
import axios from "axios";

const AddRecommend = (props) => {
  // INPUTS
  const [inputs, setInputs] = useState({
    title: "",
    description: "",
    rating: 0,
  });

  // Input change handlers
  const onTitleChange = (event) => {
    setInputs((prevState) => {
      return { ...prevState, title: event.target.value };
    });
  };

  const onDescriptionChange = (event) => {
    setInputs((prevState) => {
      return { ...prevState, description: event.target.value };
    });
  };
  const onRatingChange = (value) => {
    setInputs((prevState) => {
      return { ...prevState, rating: value };
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(inputs);

    try {
      let config = await getConfig(sessionStorage.getItem("token"));
      const response = await axios.post(
        "http://localhost:8080/courses/" + props.courseId + "/recommendations",
        inputs,
        config
      );
      if (response !== undefined && response.status === 200) {
        console.log("Recommendation submitted successfully:", response.data);
        props.onCancel();
        props.onAddRecommend();
      } else {
        console.error("Failed to submit recommendation");
        alert("חוות הדעת שלך לא הוכנסה, אנא נסה שנית");
      }
    } catch (err) {
      console.error("Failed to submit recommendation");
      alert("חוות הדעת שלך לא הוכנסה, אנא נסה שנית");
    }
  };

  return (
    <div className="add-recommend">
      <div className="backdrop" onClick={props.onCancel} />
      <Card className="add-recommend-card">
        <header>
          <Cancel
            className="add-recommend-cancel-btn"
            onClick={props.onCancel}
          />
          <h2> פרסום חוות דעת</h2>
        </header>
        <Separator />
        <form className="add-recommend-form" onSubmit={submitHandler}>
          <input
            className="add-recommend-content"
            type="text"
            placeholder="הכנס כותרת"
            value={inputs.title}
            onChange={onTitleChange}
            required
          />

          <textarea
            className="add-recommend-content text"
            type="text"
            value={inputs.description}
            onChange={onDescriptionChange}
            placeholder="הכנס תיאור"
            required
          />
          <div className="add-recommend-content recommend-rating">
            <span>דרג את הקורס:</span>
            <RatingStar
              onChange={onRatingChange}
              value={inputs.rating}
              readOnly={false}
            />
          </div>

          <Separator />
          <Button className="add-recommend-btn" type="submit">
            הוסף חוות דעת
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default AddRecommend;
