import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "../UI/Card";
import Button from "../UI/Button";
import Question from "./Question";
import { getConfig, getUserProfile } from "../user/user.ts";
import AddQuestion from "./AddQuestion";
import "./Forum.css";

const Forum = (props) => {
  const [questions, setQuestions] = useState([]);
  const [addQuestion, setAddQuestion] = useState(false);
  const [filter, setFilter] = useState(false);

  const toggleFilter = () => {
    setFilter((prev) => {
      return !prev;
    });
  };

  const filterQuestions = async () => {
    let filtered = questions;
    let user = await getUserProfile(sessionStorage.getItem("token"));
    filtered = filtered.filter((question) => {
      return question.faculty === user.faculty;
    });
    console.log("filterd: ", filtered);
    setQuestions(filtered);
  };

  useEffect(() => {
    if (filter) {
      filterQuestions();
    } else {
      getQuestions();
    }
  }, [filter]);

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
    <div className="forum">
      <Card className="forum-card">
        {addQuestion && (
          <AddQuestion onCancel={toggleAddQuestion} onSubmit={getQuestions} />
        )}
        <div className="forum-buttons">
          <Button className="forum-button" onClick={toggleFilter}>
            הצג שאלות שרלוונטיות אליי
          </Button>
          <Button className="forum-button" onClick={toggleAddQuestion}>
            הוסף שאלה
          </Button>
        </div>

        {questions.map((question) => (
          <Question
            author={question.author}
            content={question.content}
            faculty={question.faculty}
            published_time={question.published_time.substr(0, 10).split("-")}
            comments={question.question_comments}
            key={question.question_id}
            id={question.question_id}
            title={question.title}
            onSubmit={getQuestions}
          />
        ))}
      </Card>
    </div>
  );
};

export default Forum;
