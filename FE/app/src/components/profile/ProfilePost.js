import React from "react";
import { getConfig } from "../user/user.ts";
import axios from "axios";
import Card from "../UI/Card";
import Button from "../UI/Button.js";
import Likes from "../post/Likes.js";

const ProfilePost = (props) => {
  const onDelete = async () => {
    try {
      const config = getConfig(props.user.token);

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
      console.log("delete post request failed");
    }
  };
  return (
    <Card className="post-card">
      <header className="post-header">
        <Button className="post-delete" onClick={onDelete}>
          מחק פוסט
        </Button>

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
      <Likes
        className="post-likes"
        likes={props.likes}
        id={props.id}
        userMail={props.user.user_email}
        onClick={() => {}}
      />
    </Card>
  );
};
export default ProfilePost;
