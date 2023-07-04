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
    name: "תורת הגרפים",
    teachers: "ישי חביב",
    description: `תורת הגרפים היא ענף מרכזי בקומבינטוריקה עם שימושים רבים ומגוונים
    במדעי המחשב, הן התאורטיים והן היישומיים. תורה זו עוסקת באובייקט
    הקומבינטורי גרף אשר מאפשר לייצג בצורה טבעית בעיות קומבינטוריות
    ואלגוריתמיות שעולות בשימושים רבים.
    מטרת הקורס היא לספק מבוא לתורת הגרפים ולדון בה מנקודת מבט מתמטית
    באופן מעמיק. הקורס יעסוק גם בשימושים גאומטריים ואלגוריתמיים של תורת
    הגרפים. לא פעם ייעשה שימוש בכלים מאלגברה לינארית ומתורת ההסתברות. `,
    rating_avg: 2.5,
    relevant_faculty: "בחירה",
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
    name: "כלכלה משתפת",
    teachers: "דוד צפריר",
    description: `הקורס ייצור הבנה בסיסית של עולם כלכלי חברתי חדש שמתפתח ועל כלי עבודה חדשים
    בעולם זה.`,
    rating_avg: 3.5,
    relevant_faculty: "כלכלה",
    recommendations: [
      {
        description: "ממליצה!",
        rating: 5,
        title: "קורס מעניין מאוד למדתי מלא!!!",
        author_email: "yafitmi@mta.ac.il",
      },
      {
        description: "פחות ממליץ :(",
        rating: 2,
        title: "אהבתי אהבתי",
        author_email: "ohadks@mta.ac.il",
      },
    ],
  },
  {
    course_id: "3",
    name: "מבוא לקשורת מחשבים",
    teachers: "הדר בינסקי,פרי מור",
    description: `הקורס מבצע סקירת-רוחב של המושגים הבסיסיים בעולם תקשורת
    המחשבים )מושגים כגון רשתות, פרוטוקולים, מודל routing ,server-client,
    כרטיסי-רשת ו-Firewalls )תוך התמקדות ב- IP/TCP, ארכיטקטורת הרשת
    הנפוצה ביותר בשוק. התרגול המעשי של העקרונות הנלמדים מהווה נקודת-
    מפתח בקורס: אחת המטרות היא להקנות לסטודנטים יכולת לכתוב
    אפליקציות תקשורת פשוטות ולבצע ניתוח מושכל של תקשורת נתונים.`,
    rating_avg: 4.5,
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
    name: "אסטרופיזיקה",
    teachers: "רוני מועלם",
    description: "תיאור",
    rating_avg: 3.5,
    relevant_faculty: "בחירה",
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
    course_id: "5",
    name: "תורת ההנמקה",
    teachers: "זיגדון רומינה, סגל זף, גל שרון, קמה ליאור, גניסלב אסנת",
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
    course_id: "6",
    name: "פסיכודיאגנוסטיקה ",
    teachers: "זפט שירה",
    description: "תיאור",
    rating_avg: 4,
    relevant_faculty: "פסיכולוגיה",
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

  const addCourse = () => {
    //TODO
  };

  const filter = () => {
    //TODO
  };
  return (
    <div className="courses">
      <div className="courses-title">
        <img
          src="./coursesImg.webp"
          className="courses-img"
          alt="הקורסים שלנו"
        />
        <CoursesIcn className="courses-icn" />
      </div>
      <Card className="courses-card">
        <div className="course-actions">
          <Button className="add-course" onClick={addCourse}>
            הוסף קורס
          </Button>
          <Button className="filter-courses" onClick={filter}>
            הצג קורסים רלוונטים אלי
          </Button>
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
