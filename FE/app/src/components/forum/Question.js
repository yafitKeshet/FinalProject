import React, { useState } from "react";
import Card from "../UI/Card";
import "./Question.css";
import QuestionComment from "./QuestionComment";
import Separator from "../UI/Separator";
import Button from "../UI/Button";
import axios from "axios";
import { getConfig, getUserFromEmail } from "../user/user.ts";
import MiniProfile from "../user/miniProfile";
import AddComment from "./AddComment";

const Question = (props) => {
  const [authorProfile, setAuthorProfile] = useState({
    isOpen: false,
    profile: {},
  });

  const onCancelAuthorProfile = () => {
    setAuthorProfile({ isOpen: false, profile: {} });
  };
  const isAuthor =
    props.author.user_email === sessionStorage.getItem("user_email");

  const userImgClicked = async (email) => {
    let authorProfile = {};

    let authorProfileRequest = await getUserFromEmail({
      token: sessionStorage.getItem("token"),
      email: email,
    });
    authorProfile = authorProfileRequest;

    setAuthorProfile({ isOpen: true, profile: authorProfile });
  };
  const userMailClicked = async (email) => {
    let authorProfile = {};
    let authorProfileRequest = await getUserFromEmail({
      token: sessionStorage.getItem("token"),
      email: email,
    });
    authorProfile = authorProfileRequest;

    setAuthorProfile({ isOpen: true, profile: authorProfile });
  };

  const deleteQuestion = async () => {
    try {
      const config = getConfig(sessionStorage.getItem("token"));
      const response = await axios.delete(
        "http://localhost:8080/forum/question?question_id=" + props.id,
        config
      );

      if (response !== undefined && response.status === 200) {
        console.log("Question deleted successfully!");
        alert("השאלה נמחקה בהצלחה");
        props.onSubmit();
      } else {
        console.error("Question deletion failed:", response);
        alert("משהו השתבש במחיקת השאלה, אנא נסה/נסי שנית");
      }
    } catch (error) {
      console.error("Error deleting question:", error);
      alert("משהו השתבש במחיקת השאלה, אנא נסה/נסי שנית");
    }
  };

  // console.log(props.comments);
  return (
    <Card className="question">
      {authorProfile.isOpen && (
        <MiniProfile
          onCancel={onCancelAuthorProfile}
          user={authorProfile.profile}
        />
      )}
      <header>
        {isAuthor && (
          <Button className="question-delete" onClick={deleteQuestion}>
            מחק
          </Button>
        )}
        <div className="question-author">
          <img
            src={props.author.user_image}
            alt="תמונה של המשתמש"
            onClick={() => {
              userImgClicked(props.author.user_email);
            }}
          />
          <div className="author-data">
            <h4>{props.author.private_name + " " + props.author.last_name}</h4>
            <div>
              פורסם ב-
              {props.published_time[2] +
                "/" +
                props.published_time[1] +
                "/" +
                props.published_time[0]}
            </div>
          </div>
        </div>
        <h2>{props.title}</h2>
      </header>
      <Separator />
      <div className="question-content">{props.content}</div>
      <Separator />

      <div className="question-comments">
        <h4>תגובות:</h4>
        <AddComment question_id={props.id} onSubmit={props.onSubmit} />
        {props.comments.map((comment) => (
          <QuestionComment
            content={comment.content}
            key={comment.comment_id}
            id={comment.comment_id}
            author_email={comment.author.user_email}
            published_time={comment.published_time.substr(0, 10).split("-")}
            likes={comment.likes}
            onImg={userImgClicked}
            onEmail={userMailClicked}
            onSubmit={props.onSubmit}
          />
        ))}
      </div>
    </Card>
  );
};

export default Question;
