// import React, { useState } from "react";
import "./Feed.css";
import Post from "../post/Post";

const Feed = (props) => {
  // const [posts, setPosts] = useState("");
  return (
    <Post
      onError={props.onError}
      authorToken={sessionStorage.getItem("token")}
      date="19/06/2023"
      img="./users/yafitImg.jpg"
      likes={["yafit", "mor"]}
      id="1111"
      title="כותרת"
      author="יפית מזרחי"
      content="hahaha"
      userName="yafit"
    />
  );
  /* <input
onChange={onUserImageChange}
  type="file"
  value={img}
  id="img"
  className="register-content"
  name="img"
  accept="image/png, image/jpeg"
/> */
};
export default Feed;
