import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "../UI/Card";
import Button from "../UI/Button";
import Question from "./Question";
import { getConfig } from "../user/user.ts";
import AddQuestion from "./AddQuestion";

const Forum = (props) => {
  const [questions, setQuestions] = useState({});
  const [addQuestion, setAddQuestion] = useState(false);

  useEffect(() => {
    getQuestions();
  }, []);

  const getQuestions = async () => {
    try {
      const config = getConfig(sessionStorage.getItem("token"));

      const response = await axios.get("http://localhost:8080/forum", config);

      if (response !== undefined && response.status === 200) {
        const data = response.data;
        setQuestions(data);
        console.log("Forum data taken successfully!", data);
      } else {
        console.error("Forum data get failed:", response);
        alert("משהו השתבש בהצגת הפורום אנא נסה/נסי שנית");
      }
    } catch (error) {
      if (error.response) {
        console.error("Forum data get failed:", error.response.status);
        alert("משהו השתבש בהצגת הפורום אנא נסה/נסי שנית");
      } else {
        console.error("Error Forum data get:", error);
        alert("משהו השתבש בהצגת הפורום אנא נסה/נסי שנית");
      }
    }
  };

  const toggleAddQuestion = () => {
    setAddQuestion((prev) => !prev);
  };

  return (
    <div>
      {addQuestion && (
        <AddQuestion onCancel={toggleAddQuestion} onSubmit={getQuestions} />
      )}
      Forum
      <Button onClick={toggleAddQuestion}>הוסף שאלה</Button>
      <Question />
    </div>
  );
};

export default Forum;
