import React from "react";
import "./Post.css";
import Card from "../UI/Card";
import Separator from "../UI/Separator";
import Likes from "./Likes";

const Post = (props) => {
  return (
    <Card className="post-card">
      <header className="post-header">
        <h2 className="post-title">{props.title}</h2>
        <div className="post-author">{props.author}</div>
        {props.isAuthor && <div className="post-delete">מחק</div>}
      </header>

      <div className="post-contents">{props.content} </div>
      <Separator />
      <Likes className="post-likes" likes={props.likes} id={props.id} />
    </Card>
  );
};
export default Post;
