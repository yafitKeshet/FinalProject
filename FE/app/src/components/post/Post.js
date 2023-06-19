import React from "react";
import "./Post.css";
import Card from "../UI/Card";
import Separator from "../UI/Separator";
import Likes from "./Likes";
import Button from "../UI/Button";
import { getUserFromJWT } from "../../generalFunctions.ts";
import axios from "axios";

const Post = (props) => {
  const userData = getUserFromJWT(sessionStorage.getItem("token"));
  const isAuthor = props.authorMail === userData.user_email;

  const onDelete = async () => {
    try {
      const config = {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
      };

      let deletePostsRequest = await axios.delete(
        "http://localhost:8080/feed?id=" + props.id,
        config
      );
      if (
        deletePostsRequest !== undefined &&
        deletePostsRequest.status === 200
      ) {
        console.log(`post ${props.id} was deleted`);
        props.onDeletePost();
      }
    } catch (err) {
      alert("משהו השתבש אנא נסה/נסי שנית");
      console.log("feed request failed");
    }

    console.log(`post ${props.id} was deleted`);
  };
  return (
    <Card className="post-card">
      <header className="post-header">
        {isAuthor && (
          <Button className="post-delete" onClick={onDelete}>
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
        userMail={userData.user_email}
      />
    </Card>
  );
};
export default Post;
