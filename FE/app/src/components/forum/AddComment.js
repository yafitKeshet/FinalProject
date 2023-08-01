import React, { useState } from "react";
import axios from "axios";
// import Card from "../UI/Card";
// import Cancel from "../UI/SVG/Cancel";
// import Separator from "../UI/Separator";
import Button from "../UI/Button";
import { getConfig } from "../user/user.ts";
import "./AddComment.css";

const AddComment = (props) => {
  const [inputs, setInputs] = useState({
    question_id: props.question_id,
    content: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // console.log(e.target);
    setInputs((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const config = getConfig(sessionStorage.getItem("token"));
      const response = await axios.post(
        `http://localhost:8080/forum/comment`,
        inputs,
        config
      );

      if (response !== undefined && response.status === 200) {
        console.log("Comment submitted successfully!");
        alert("התגובה נוספה בהצלחה");
        setInputs((prev) => {
          return { ...prev, content: "" };
        });
        props.onSubmit();
      } else {
        console.error("Comment submission failed:", response);
        alert("משהו השתבש בהוספת התגובה, אנא נסה/נסי שנית");
      }
    } catch (error) {
      console.error("Error submitting comment:", error);
      alert("משהו השתבש בהוספת התגובה, אנא נסה/נסי שנית");
    }
  };

  return (
    <form className="addComment" onSubmit={handleSubmit}>
      <input
        type="text"
        name="content"
        value={inputs.content}
        onChange={handleInputChange}
        placeholder="הוסף תגובה..."
        required
      />
      <Button className="addComment-btn" type="submit">
        הגב
      </Button>
    </form>
  );
};

export default AddComment;
