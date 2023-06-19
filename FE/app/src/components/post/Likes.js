import React, { useState } from "react";
import "./Likes.css";
import Like from "../UI/SVG/Like";

const Likes = (props) => {
  const [likes, setData] = useState(props.likes);
  const [displayAll, setDisplayAll] = useState(false);

  const onLike = () => {
    //TODO patch
    setData((prev) => {
      let isLike = !likes.includes(props.userName);

      let newLikes = isLike
        ? [...likes, props.userName]
        : likes.filter((name) => name !== props.userName);

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
        <Like like={likes.includes(props.userName)} />
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
