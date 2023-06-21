import React, { useEffect, useState } from "react";
import "./Feed.css";
import Post from "../post/Post";
import axios from "axios";
import UploadPost from "../post/UploadPost";
import Card from "../UI/Card";
import Button from "../UI/Button";
import { getConfig } from "../user/user.ts";
import Jobs from "../UI/SVG/Jobs";

const Feed = (props) => {
  const [posts, setPosts] = useState({});
  const [filter, setFilter] = useState(false);

  const toggleFilter = () => {
    setFilter((prev) => {
      return !prev;
    });
  };

  useEffect(() => {
    if (filter) {
      filterPosts();
    } else {
      getPosts();
    }
  }, [filter]);

  const filterPosts = () => {
    let filtered = posts;
    filtered = filtered.filter((post) => {
      return post.author.faculty === props.user.faculty;
    });

    setPosts(filtered);
  };

  const getPosts = async () => {
    try {
      const config = getConfig(props.user.token);

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

  const cancelUploadPost = () => {
    console.log("post cancel");
  };

  console.log(props.user);

  return (
    <div className="feed">
      <Card className="feed-card">
        <Jobs />
        <UploadPost
          user={props.user}
          onCancel={cancelUploadPost}
          moveToProfile={props.moveToProfile}
          onSubmit={getPosts}
        />
        <div className="postsFilter-buttons">
          <Button onClick={toggleFilter}>הצג פוסטים שרלוונטים אליי</Button>
        </div>
        {Object.values(posts).map((post) => (
          <Post
            user={props.user}
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
      </Card>
    </div>
  );
};
export default Feed;
