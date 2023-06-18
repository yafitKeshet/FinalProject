import React, { useState } from "react";
import "./Likes.css";
import Like from "../UI/SVG/Like";

const Likes = (props) => {
  const [likes, setData] = useState(props.likes);
  const [displayAll, setDisplayAll] = useState(false);

  const onDisplayAll = () => {
    setDisplayAll((prev) => {
      return !prev;
    });
  };

  const onLike = () => {
    //props.id
    let newLike = "lonnie";
    let newLikes = [...likes, newLike];
    console.log("like :)");
    setData(newLikes);
  };

  console.log(likes);
  return (
    <div className="likes">
      <div className="likes-amount" onClick={onLike}>
        <Like />
        <div>{likes.length}</div>
      </div>

      <div className="likes-list">
        {/* {likes.length === 0 && <div>לפוסט זה אין לייקים, תהיה הראשון?</div>} */}
        {likes.length > 0 && !displayAll && (
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
