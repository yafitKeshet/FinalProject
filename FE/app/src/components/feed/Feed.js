import React, { useEffect, useState } from "react";
import "./Feed.css";
import Post from "../post/Post";
import axios from "axios";

const Feed = (props) => {
  const [posts, setPosts] = useState({});

  const getPosts = async () => {
    try {
      const config = {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
      };

      let postsRequest = await axios.get("http://localhost:8080/feed", config);
      if (postsRequest !== undefined && postsRequest.status === 200) {
        console.log("posts: ", postsRequest.data);
        setPosts(postsRequest.data);
      }
    } catch (err) {
      alert("משהו השתבש אנא נסה/נסי שנית");
      console.log("feed request failed");
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  let arr = Object.values(posts);
  console.log(arr);
  return (
    <div>
      {arr.map((post) => (
        <Post
          onError={props.onError}
          authorMail={post.author.user_email}
          date="19/06/2023"
          img={post.author.user_image}
          likes={post.likes}
          id={post.post_id}
          title={post.title}
          author={post.author.private_name + " " + post.author.last_name}
          content={post.content}
          key={Math.random()}
          onDeletePost={getPosts}
        />
      ))}
    </div>
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
