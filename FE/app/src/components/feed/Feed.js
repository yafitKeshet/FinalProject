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
};
export default Feed;
