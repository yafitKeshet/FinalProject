import React from "react";
import "./Post.css";
import Card from "../UI/Card";
import Separator from "../UI/Separator";
import Likes from "./Likes";
import Button from "../UI/Button";

const Post = (props) => {
  return (
    <Card className="post-card">
      <header className="post-header">
        {props.isAuthor && (
          <Button className="post-delete" onClick={props.onDelete}>
            מחק פוסט
          </Button>
        )}
        <div className="post-author">
          <img src={props.img} alt="תמונה של המשתמש" />
          <div className="author-data">
            <h4>{props.author}</h4>
            <div>{props.date}</div>
          </div>
        </div>
        <h2 className="post-title">{props.title}</h2>
      </header>
      <div className="post-contents">
        <div className="post-content">{props.content} </div>
      </div>
      <Separator />
      <Likes
        className="post-likes"
        likes={props.likes}
        id={props.id}
        userName={props.userName}
      />
    </Card>
  );
};
export default Post;
