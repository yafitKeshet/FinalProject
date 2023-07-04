import React, { useEffect, useState } from "react";
import "./Recommendation.css";
import { getUserFromEmail } from "../user/user.ts";
import Separator from "../UI/Separator";
import RatingStar from "./RatingStar";
import MiniProfile from "../user/miniProfile";
import Button from "../UI/Button";

const Recommendation = (props) => {
  const [author, setAuthor] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const isAuthor = author.user_email === props.recommend.author_email;

  useEffect(() => {
    const getUser = async () => {
      let author = await getUserFromEmail({
        token: sessionStorage.getItem("token"),
        email: props.recommend.author_email,
      });
      console.log(author);
      setAuthor(author);
    };
    getUser();
  }, []);

  const onDelete = () => {
    //TODO
  };
  const onCancelAuthorProfile = () => {
    setIsOpen(false);
  };

  const userImgClicked = () => {
    setIsOpen(true);
  };

  return (
    <div className="recommendation">
      {isAuthor && (
        <Button className="recommend-delete" onClick={onDelete}>
          מחק
        </Button>
      )}
      {isOpen && <MiniProfile onCancel={onCancelAuthorProfile} user={author} />}
      <header>
        <div className="recommend-author">
          <img
            onClick={userImgClicked}
            src={author.user_image}
            alt="תמונה של המשתמש"
          />
          <h2> {author.private_name + " " + author.last_name}</h2>
        </div>
        <RatingStar
          className="recommend-rank"
          readOnly={true}
          value={props.recommend.rating}
        />
      </header>
      <Separator />
      <div className="recommend-contents">
        <h5>{props.recommend.title}</h5>
        <span>{props.recommend.description}</span>
      </div>
    </div>
  );
};

export default Recommendation;

/*      description: "לא אהבתי בלה בלה",
        Rating: 1,
        title: "לא לא אהבתי אהבתי",
        author_email: "yafitmi@mta.ac.il",
*/
