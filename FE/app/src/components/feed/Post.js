import React from "react";
import "./Post.css";
import Card from "../UI/Card";
import Separator from "../UI/Separator";

const Post = (props) => {
  return (
    <Card>
      <header>פוסט</header>
      <Separator />

      <div>בלה בלה</div>
      <Separator />
      <footer>למטה</footer>
    </Card>
  );
};
export default Post;
