import React from "react";
import "./Course.css";
import RatingStar from "./RatingStar";
import Card from "../UI/Card";
import Separator from "../UI/Separator";
import Recommendation from "./Recommendation";
import CourseIcn from "../UI/SVG/CourseIcn";
import CourseTeacher from "../UI/SVG/CourseTeacher";
import CourseDescription from "../UI/SVG/CourseDescription";
import RecommendationIcn from "../UI/SVG/RecommendationIcn";

const Course = (props) => {
  const teachers = props.teachers.replace(",", "").split(" ");
  return (
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
              <li key={Math.random()}>{teacher}</li>
            ))}
          </ul>
        </div>
      </header>
      <Separator />
      <div>
        <header>
          <CourseDescription className="course-list-icn" />
          <span>תיאור הקורס:</span>
        </header>
        <p>{props.description}</p>
      </div>
      <Separator />
      <span> דירוג הקורס: </span>
      <RatingStar value={props.rating_avg} readOnly={true} />
      <Separator />
      <div className="recommendations">
        <header>
          <RecommendationIcn className="course-list-icn" />
          <h3>חוות דעת:</h3>
        </header>
        <ul>
          {props.recommendations.map((recommend) => (
            <li key={Math.random()}>
              <Recommendation recommend={recommend} />
            </li>
          ))}
        </ul>
      </div>
    </Card>
  );
};

export default Course;

/*          name={course.name}
            teachers={course.teachers}
            description={course.description}
            rating_avg={course.rating_avg}
            relevant_faculty={course.relevant_faculty}
            recommendations={course.recommendations}
            key={course.course_id}
            */
