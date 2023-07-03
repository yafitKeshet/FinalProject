import React, { useState } from "react";
import "./Post.css";
import Card from "../UI/Card";
import Separator from "../UI/Separator";
import Likes from "./Likes";
import Button from "../UI/Button";
import axios from "axios";
import { getConfig, getUserFromEmail } from "../user/user.ts";
import MiniProfile from "../user/miniProfile";

const Post = (props) => {
  const [authorProfile, setAuthorProfile] = useState({
    isOpen: false,
    profile: {},
  });

  const onCancelAuthorProfile = () => {
    setAuthorProfile({ isOpen: false, profile: {} });
  };
  const isAuthor = props.authorMail === props.user.user_email;

  const userImgClicked = async () => {
    let authorProfile = {};

    let authorProfileRequest = await getUserFromEmail({
      token: props.user.token,
      email: props.authorMail,
    });
    authorProfile = authorProfileRequest;

    setAuthorProfile({ isOpen: true, profile: authorProfile });
  };

  const userMailClicked = async (email) => {
    let authorProfile = {};
    let authorProfileRequest = await getUserFromEmail({
      token: props.user.token,
      email: email,
    });
    authorProfile = authorProfileRequest;

    setAuthorProfile({ isOpen: true, profile: authorProfile });
  };
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

  // Calculate Date
  let postTime = Date.parse(props.date);
  postTime = new Date(postTime);
  postTime.setHours(postTime.getHours() + 3);
  const timeRemaining = new Date(new Date().getTime() - postTime.getTime());
  let date = props.date.substr(0, 10).split("-");
  let new_date = date[2] + "/" + date[1] + "/" + date[0];
  console.log("post: ", props.id, "ppsted: ", postTime);
  console.log("now: ", new Date());
  console.log("days: ", Math.floor(timeRemaining / (1000 * 60 * 60 * 24)));
  console.log(
    "hours: ",
    (timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const hoursRemaining = Math.floor(
    (timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );

  /*
   "\n minutes: ",
    Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60))
    */
  return (
    <Card className="post-card">
      {authorProfile.isOpen && (
        <MiniProfile
          onCancel={onCancelAuthorProfile}
          user={authorProfile.profile}
        />
      )}
      <header className="post-header">
        {isAuthor && (
          <Button className="post-delete" onClick={onDelete}>
            מחק פוסט
          </Button>
        )}
        <div className="post-author">
          <img src={props.img} alt="תמונה של המשתמש" onClick={userImgClicked} />
          <div className="author-data">
            <h4>{props.author}</h4>
            {/* <div>פורסם ב-{new_date}</div> */}
            <div>
              פורסם ב-{new_date}, לפני {hoursRemaining} שעות
            </div>
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
        userMail={props.user.user_email}
        onClick={userMailClicked}
      />
    </Card>
  );
};
export default Post;
