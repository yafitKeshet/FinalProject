import React, { useEffect, useState } from "react";
import "./Feed.css";
import Post from "../post/Post";
import axios from "axios";
import UploadPost from "../post/UploadPost";
import Card from "../UI/Card";
import Button from "../UI/Button";
import { getConfig, getUserProfile } from "../user/user.ts";

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

  const filterPosts = async () => {
    let filtered = posts;
    let user = await getUserProfile(sessionStorage.getItem("token"));
    filtered = filtered.filter((post) => {
      return post.faculty === user.faculty;
    });

    setPosts(filtered);
  };

  // Calculate Date
  let date = new Date();
  date.setHours(date.getHours() - 3);
  date = date.getTime();

  const getPosts = async () => {
    try {
      const config = getConfig(props.user.token);

      let postsRequest = await axios.get("http://localhost:8080/feed", config);
      if (postsRequest !== undefined && postsRequest.status === 200) {
        // Filtering posts for 24h ago.
        let filtered = postsRequest.data;
        filtered = filtered.filter((post) => {
          return (
            Math.floor(
              new Date(
                date - new Date(Date.parse(post.published_time)).getTime()
              ) /
                (1000 * 60 * 60 * 24)
            ) < 1
          );
        });

        setPosts(filtered);
        // setPosts(postsRequest.data);
      }
    } catch (err) {
      alert("משהו השתבש אנא נסה/נסי שנית");
      console.log("feed request failed");
    }
  };

  return (
    <div className="feed">
      <Card className="feed-card">
        <UploadPost
          user={props.user}
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
            date={post.published_time.substr(0, 10).split("-")}
            img={post.author.user_image}
            likes={post.likes}
            id={post.post_id}
            title={post.title}
            author={post.author.private_name + " " + post.author.last_name}
            content={post.content}
            key={Math.random()}
            onDeletePost={getPosts}
            hoursRemaining={Math.floor(
              (new Date(
                date - new Date(Date.parse(post.published_time)).getTime()
              ) %
                (1000 * 60 * 60 * 24)) /
                (1000 * 60 * 60)
            )}
          />
        ))}
      </Card>
    </div>
  );
};
export default Feed;
