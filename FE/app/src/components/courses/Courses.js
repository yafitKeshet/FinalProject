import React, { useEffect, useState } from "react";
import "./Courses.css";
import axios from "axios";
import Card from "../UI/Card";
import Button from "../UI/Button.js";
import Course from "./Course";
import Separator from "../UI/Separator";
import CoursesIcn from "../UI/SVG/CoursesIcn";

const tempCourses = [
  {
    course_id: "1",
    name: "ביולוגיה",
    teachers: "yafit, mor",
    description: "תיאור",
    rating_avg: 2.5,
    relevant_faculty: "מדעי המחשב",
    recommendations: [
      {
        description: "לא אהבתי בלה בלה",
        rating: 1,
        title: "לא לא אהבתי אהבתי",
        author_email: "yafitmi@mta.ac.il",
      },
      {
        description: "אהבתי בלה בלה",
        rating: 4,
        title: "אהבתי אהבתי",
        author_email: "ohadks@mta.ac.il",
      },
    ],
  },
  {
    course_id: "2",
    name: "פייתון",
    teachers: "מורות",
    description: "תיאור",
    rating_avg: 2.5,
    relevant_faculty: "מדעי המחשב",
    recommendations: [
      {
        description: "לא אהבתי בלה בלה",
        rating: 1,
        title: "לא לא אהבתי אהבתי",
        author_email: "yafitmi@mta.ac.il",
      },
      {
        description: "אהבתי בלה בלה",
        rating: 4,
        title: "אהבתי אהבתי",
        author_email: "yafitmi@mta.ac.il",
      },
    ],
  },
  {
    course_id: "3",
    name: "לשון",
    teachers: "מורות",
    description: "תיאור",
    rating_avg: 2.5,
    relevant_faculty: "מדעי המחשב",
    recommendations: [
      {
        description: "לא אהבתי בלה בלה",
        rating: 1,
        title: "לא לא אהבתי אהבתי",
        author_email: "yafitmi@mta.ac.il",
      },
      {
        description: "אהבתי בלה בלה",
        rating: 4,
        title: "אהבתי אהבתי",
        author_email: "yafitmi@mta.ac.il",
      },
    ],
  },
  {
    course_id: "4",
    name: "לשון",
    teachers: "מורות",
    description: "תיאור",
    rating_avg: 2.5,
    relevant_faculty: "מדעי המחשב",
    recommendations: [
      {
        description: "לא אהבתי בלה בלה",
        rating: 1,
        title: "לא לא אהבתי אהבתי",
        author_email: "yafitmi@mta.ac.il",
      },
      {
        description: "אהבתי בלה בלה",
        rating: 4,
        title: "אהבתי אהבתי",
        author_email: "yafitmi@mta.ac.il",
      },
    ],
  },
];

const Courses = (props) => {
  const [courses, setCourses] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [rating, setRating] = useState(0);
  const [isOpen, setIsOpen] = useState(true);

  const toggleIsOpen = () => {
    setIsOpen((prev) => {
      return !prev;
    });
  };

  useEffect(() => {
    // Fetch courses data from the API
    // getCoursesData();
    setCourses(tempCourses);
  }, []);

  const getCoursesData = async () => {
    try {
      let coursesRequest = await axios.get("http://localhost:8080/courses");
      if (coursesRequest !== undefined && coursesRequest.status === 200) {
        let courses = coursesRequest.data; // array of courses
        console.log("courses: ", courses);
        setCourses(courses);
      }
    } catch (err) {
      alert("משהו השתבש אנא נסה/נסי שנית");
      console.log("courses request failed");
    }
  };

  return (
    <div className="courses">
      <Card className="courses-card">
        <div className="courses-title">
          <img
            src="./coursesImg.webp"
            className="courses-img"
            alt="הקורסים שלנו"
          />
          <CoursesIcn className="courses-icn" />
        </div>
        {courses.map((course) => (
          <Course
            name={course.name}
            teachers={course.teachers}
            description={course.description}
            rating_avg={course.rating_avg}
            relevant_faculty={course.relevant_faculty}
            recommendations={course.recommendations}
            key={course.course_id}
          />
        ))}
      </Card>
    </div>
  );
};

export default Courses;
