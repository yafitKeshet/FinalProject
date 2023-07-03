import React, { useEffect, useState } from "react";
import "./Recommendation.css";
import Card from "../UI/Card";
import { getUserFromEmail } from "../user/user.ts";
import Separator from "../UI/Separator";
import RatingStar from "./RatingStar";

const Recommendation = (props) => {
  const [author, setAuthor] = useState({});
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

  return (
    <div className="recommendation">
      <div>
        <header>
          <div>
            <img
              width={20}
              height={20}
              src={author.user_image}
              alt="תמונה של המשתמש"
            />
            <h2> {author.private_name + " " + author.last_name}</h2>
          </div>
          <span>דירוג:</span>
          <RatingStar readOnly={true} value={props.recommend.rating} />
        </header>
        <Separator />
        <div>
          <span>{props.recommend.title}</span>
          <span>{props.recommend.description}</span>
        </div>
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
