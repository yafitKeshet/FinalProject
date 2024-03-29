import React, { useState } from "react";
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
import AddRecommend from "./AddRecommend";
import { getFaculty } from "../enums/enums.ts";

const Course = (props) => {
  const [addRecommendOpen, setAddRecommendOPen] = useState(false);

  const toggleAddRecommend = () => {
    setAddRecommendOPen((prev) => {
      return !prev;
    });
  };
  console.log(props.courseId, props.rating_avg);

  const teachers = props.teachers.split(",");

  const getColorLabel = (faculty) => {
    switch (getFaculty(faculty)) {
      case "מדעי המחשב":
        return "#f08080";
      case "פסיכולוגיה":
        return "#add8e6";
      case "כלכלה":
        return "#90ee90";
      case "בחירה":
      default:
        return "#778899";
    }
  };

  return (
    <div className="course-outer">
      {addRecommendOpen && (
        <AddRecommend
          onCancel={toggleAddRecommend}
          onAddRecommend={props.onChange}
          courseId={props.courseId}
        />
      )}
      <label
        className="course-faculty"
        style={{
          backgroundColor: `${getColorLabel(props.relevant_faculty)}`,
        }}
      >
        {getFaculty(props.relevant_faculty)}
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
            <Button className="add-recommend" onClick={toggleAddRecommend}>
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
