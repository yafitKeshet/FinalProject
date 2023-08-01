import React from "react";
import "./Course.css";
import RatingStar from "./RatingStar";
import Card from "../UI/Card";
import Recommendation from "./Recommendation";
import CourseIcn from "../UI/SVG/CourseIcn";
import CourseTeacher from "../UI/SVG/CourseTeacher";
import CourseDescription from "../UI/SVG/CourseDescription";
import RecommendationIcn from "../UI/SVG/RecommendationIcn";
import RatingIcn from "../UI/SVG/RatingIcn";
import Button from "../UI/Button";

const Course = (props) => {
  const teachers = props.teachers.split(",");
  const addRecommend = () => {
    //TODO
  };

  const getColorLabel = (faculty) => {
    switch (faculty) {
      case "מדעי המחשב":
        return "#f08080";
      case "פסיכולוגיה":
        return "#add8e6";
      case "כלכלה":
        return "#90ee90";
      case "בחירה":
        return "#778899";
      default:
        return "#ffffff";
    }
  };
  return (
    <div className="course-outer">
      <label
        className="course-faculty"
        style={{
          backgroundColor: `${getColorLabel(props.relevant_faculty)}`,
        }}
      >
        {props.relevant_faculty}
      </label>
      <Card className="course">
        <CourseIcn className="course-icn" />
        <header>
          <h2> {props.name}</h2>
          <div>
            <header>
              <CourseTeacher className="course-list-icn" />
              <span>מרצים:</span>
            </header>
            <ul>
              {teachers.map((teacher) => (
                <li key={Math.random()}>- {teacher}</li>
              ))}
            </ul>
          </div>
        </header>
        <div>
          <header>
            <CourseDescription className="course-list-icn" />
            <span>תיאור הקורס:</span>
          </header>
          <ul>
            <li>{props.description}</li>
          </ul>
        </div>
        <div className="course-rating">
          <header>
            <RatingIcn className="course-list-icn" />
            <span> דירוג הקורס: </span>
          </header>
          <RatingStar value={props.rating_avg} readOnly={true} />
        </div>
        <div className="recommendations">
          <header className="recommendations-header">
            <Button className="add-recommend" onClick={addRecommend}>
              הוסף חוות דעת
            </Button>

            <RecommendationIcn className="course-list-icn" />
            <h3>חוות דעת:</h3>
          </header>
          <ul>
            {props.recommendations.map((recommend) => (
              <li key={Math.random()} className="recommend-item">
                <Recommendation recommend={recommend} />
              </li>
            ))}
          </ul>
        </div>
      </Card>
    </div>
  );
};

export default Course;
