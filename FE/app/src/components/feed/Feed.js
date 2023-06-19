import React, { useState, useRef } from "react";
import "./Feed.css";
import Post from "./Post";

const Feed = (props) => {
  const [posts, setPosts] = useState("");
  return (
    <Post
      likes={[]}
      id="1111"
      title="פוסט"
      author="יפית מזרחי"
      content="hahaha"
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
