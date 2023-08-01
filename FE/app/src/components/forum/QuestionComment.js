import React, { useState, useEffect } from "react";
import Likes from "../likes/Likes";
import "./QuestionComment.css";
import Card from "../UI/Card";
import Button from "../UI/Button";
import Separator from "../UI/Separator";
import { getConfig, getUserFromEmail } from "../user/user.ts";
import axios from "axios";

const QuestionComment = (props) => {
  const [author, setAuthor] = useState({});
  const isAuthor = props.author_email === sessionStorage.getItem("user_email");

  useEffect(() => {
    const getUser = async () => {
      let author = await getUserFromEmail({
        token: sessionStorage.getItem("token"),
        email: props.author_email,
      });
      setAuthor(author);
    };
    getUser();
  }, []);
  // console.log(props);

  const onDelete = async () => {
    try {
      const config = getConfig(sessionStorage.getItem("token"));

      const response = await axios.delete(
        "http://localhost:8080/forum/comment?comment_id=" + props.id,
        config
      );

      if (response !== undefined && response.status === 200) {
        console.log("Comment deleted successfully!");
        alert("התגובה נמחקה בהצלחה");
        props.onSubmit();
      }
    } catch (error) {
      console.error("Error deleting Comment:", error);
      alert("משהו השתבש במחיקת התגובה, אנא נסה/נסי שנית");
    }
  };
  return (
    <Card className="comment-card">
      <div className="comment-author">
        <img
          onClick={() => {
            props.onImg(author.user_email);
          }}
          src={author.user_image}
          alt="תמונה של המשתמש"
        />
        <h6> {author.private_name + " " + author.last_name}</h6>
      </div>
      <Separator className="rotate-sep" />
      <div className="comment-contents">
        <h6>{props.content}</h6>
        <div>
          <Likes
            page="forum/comment"
            field="comment_id"
            className="comment-likes"
            likes={props.likes}
            id={props.id}
            userMail={sessionStorage.getItem("user_email")}
            onClick={props.onEmail}
          />
          <span className={`${!isAuthor && "date"}`}>
            {props.published_time[2] +
              "/" +
              props.published_time[1] +
              "/" +
              props.published_time[0]}
          </span>
        </div>
      </div>
      {isAuthor && <Separator className="rotate-sep" />}{" "}
      {isAuthor && (
        <Button className="comment-delete" onClick={onDelete}>
          מחק
        </Button>
      )}
    </Card>
  );
};

export default QuestionComment;
