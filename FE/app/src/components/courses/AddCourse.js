import React, { useState } from "react";
import Card from "../UI/Card";
import "./AddCourse.css";
import Cancel from "../UI/SVG/Cancel";
import Separator from "../UI/Separator";
import Button from "../UI/Button";

import { Faculty, getFaculty } from "../enums/enums.ts";

const AddCourse = (props) => {
  // INPUTS
  const [teachersArr, setTeachers] = useState([
    { first_name: "", last_name: "" },
  ]);
  const [inputs, setInputs] = useState({
    // publisher_email: sessionStorage.getItem("user_email"),
    relevant_faculty: "",
    name: "",
    description: "",
  });

  // Input change handlers
  const onNameChange = (event) => {
    setInputs((prevState) => {
      return { ...prevState, name: event.target.value };
    });
  };

  const onDescriptionChange = (event) => {
    setInputs((prevState) => {
      return { ...prevState, description: event.target.value };
    });
  };
  const onTeacherFirstNameChange = (event, index) => {
    const teachers = [...teachersArr];
    teachers[index]["first_name"] = event.target.value;
    setTeachers(teachers);
  };
  const onTeacherLastNameChange = (event, index) => {
    const teachers = [...teachersArr];
    teachers[index]["last_name"] = event.target.value;
    setTeachers(teachers);
  };

  const onRelevant_facultyChange = (event) => {
    setInputs((prevState) => {
      return {
        ...prevState,
        relevant_faculty: event.target.value,
      };
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(inputs);

    props.onAddCourse();
  };

  const addTeacher = () => {
    setTeachers((prev) => {
      return [...prev, { first_name: "", last_name: "" }];
    });
  };
  const removeTeacher = (index) => {
    let teachers = [...teachersArr];
    teachers = teachers.slice(0, index).concat(teachers.slice(index + 1));
    setTeachers(teachers);
  };
  return (
    <div className="add-course">
      <div className="backdrop" onClick={props.onCancel} />
      <Card className="add-course-card">
        <header>
          <Cancel className="add-course-cancel-btn" onClick={props.onCancel} />
          <h2> פרסום קורס</h2>
        </header>
        <Separator />
        <form className="add-course-form" onSubmit={submitHandler}>
          <div className="course-details">
            <input
              className="add-course-content"
              type="text"
              placeholder="הכנס שם קורס"
              value={inputs.name}
              onChange={onNameChange}
              required
            />
            <select
              className="add-course-content"
              onChange={onRelevant_facultyChange}
              value={inputs.time_required}
              required
            >
              <option value="">אנא בחרי/י פקולטה</option>

              {Object.keys(Faculty).map((faculty) => {
                return (
                  <option value={faculty} key={Math.random().toString()}>
                    {getFaculty(faculty)}
                  </option>
                );
              })}
            </select>

            <textarea
              className="add-course-content text"
              type="text"
              value={inputs.description}
              onChange={onDescriptionChange}
              placeholder="הכנס תיאור לקורס"
              required
            />
          </div>

          <h4>מרצים</h4>
          {teachersArr.map((teacher, index) => (
            <div>
              <input
                className="add-course-content"
                type="text"
                placeholder="הכנס שם פרטי"
                value={teachersArr[index]["first_name"]}
                onChange={(event) => {
                  onTeacherFirstNameChange(event, index);
                }}
                required
              />
              <input
                className="add-course-content"
                type="text"
                placeholder="הכנס שם משפחה"
                value={teachersArr[index]["last_name"]}
                onChange={(event) => {
                  onTeacherLastNameChange(event, index);
                }}
                required
              />
              <Button onClick={addTeacher}>הוסף מרצה</Button>{" "}
              {index !== 0 && (
                <Button
                  onClick={() => {
                    removeTeacher(index);
                  }}
                >
                  מחק מרצה
                </Button>
              )}
            </div>
          ))}
          <Separator />
          <Button className="add-course-btn" type="submit">
            הוסף קורס
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default AddCourse;
