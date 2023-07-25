import React, { useState } from "react";
import axios from "axios";
import Card from "../UI/Card";
import Cancel from "../UI/SVG/Cancel";
import Separator from "../UI/Separator";
import Button from "../UI/Button";
import { getConfig, getUserProfile } from "../user/user.ts";
import "./AddQuestion.css";

const AddQuestion = (props) => {
  const [inputs, setInputs] = useState({
    title: "",
    content: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setInputs((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const config = getConfig(sessionStorage.getItem("token"));
      const response = await axios.post(
        "http://localhost:8080/forum/newQuestion",
        inputs,
        config
      );

      if (response.status === 200) {
        console.log("Form submitted successfully!");
        alert("שאלתך פורסמה בהצלחה");
      } else {
        console.error("Form submission failed:", response);
        alert("משהו השתבש בפרסום השאלה אנא נסה/נסי שנית");
      }
    } catch (error) {
      if (error.response) {
        console.error("Form submission failed:", error.response.status);
        alert("משהו השתבש בפרסום השאלה אנא נסה/נסי שנית");
      } else {
        console.error("Error submitting form:", error);
        alert("משהו השתבש בפרסום השאלה אנא נסה/נסי שנית");
      }
    }
    props.onCancel();
    props.onSubmit();
  };

  return (
    <div className="addQuestion">
      <div className="backdrop" onClick={props.onCancel} />
      <Card className="addQuestion-card">
        <header>
          <Cancel className="addQuestion-cancel-btn" onClick={props.onCancel} />
          <h2>הוסף שאלה</h2>
        </header>
        <Separator />
        <form className="addQuestion-form" onSubmit={submitHandler}>
          <div className="addQuestion-details">
            <label>כותרת השאלה:</label>
            <input
              type="text"
              name="title"
              value={inputs.title}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="addQuestion-details">
            <label>תוכן השאלה:</label>
            <textarea
              name="content"
              value={inputs.content}
              onChange={handleInputChange}
              required
            ></textarea>
          </div>
          <Separator />
          <Button className="addQuestions-submit-btn" type="submit">
            פרסם
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default AddQuestion;
