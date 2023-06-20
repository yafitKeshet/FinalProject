import React, { useState } from "react";
import "./Likes.css";
import Like from "../UI/SVG/Like";

const Likes = (props) => {
  const [likes, setData] = useState(props.likes);
  const [displayAll, setDisplayAll] = useState(false);

  const onLike = async () => {
    try {
      fetch(
        "http://localhost:8080/feed/like?like=" +
          !likes.includes(props.userMail) +
          "&id=" +
          props.id,
        {
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("token"),
          },
          method: "PATCH",
        }
      ).then((likeRequest) => {
        if (likeRequest !== undefined && likeRequest.status === 200) {
          console.log(`post ${props.id} was liked by ${props.userMail}`);
        }
      });
    } catch (err) {
      console.log(err);
      console.log("like request failed");
    }

    setData((prev) => {
      let isLike = !prev.includes(props.userMail);

      let newLikes = isLike
        ? [...prev, props.userMail]
        : prev.filter((name) => name !== props.userMail);

      return newLikes;
    });
  };

  const onDisplayAll = () => {
    setDisplayAll((prev) => {
      return !prev;
    });
  };

  return (
    <div className="likes">
      <div className="likes-amount" onClick={onLike}>
        <Like like={likes.includes(props.userMail)} />
        <div>{likes.length}</div>
      </div>

      <div className="likes-list">
        {likes.length === 1 && <div className="not-all">{likes[0]}</div>}
        {likes.length > 1 && !displayAll && (
          <div className="not-all" onClick={onDisplayAll}>
            {likes[0]} ועוד {likes.length - 1}
          </div>
        )}

        {likes.length > 0 && displayAll && (
          <ul className="backdrop" onClick={onDisplayAll}>
            {likes.map((name) => (
              <li key={Math.random()}>{name}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
    // </div>
  );
};
export default Likes;
