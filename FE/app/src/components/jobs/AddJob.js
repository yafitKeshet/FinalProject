import React, { useState } from "react";
import Card from "../UI/Card";
import "./AddJob.css";
import Cancel from "../UI/SVG/Cancel";
import Separator from "../UI/Separator";
import { getUserFromEmail } from "../user/user.ts";
import ImageUpload from "../images/ImageUpload";
import Company from "../UI/SVG/Company";
import Button from "../UI/Button";

import {
  Experience,
  getExperience,
  JobTime,
  getJobTime,
} from "../enums/enums.ts";

const AddJob = (props) => {
  // INPUTS
  const [inputs, setInputs] = useState({
    // publisher_email: sessionStorage.getItem("user_email"),
    // faculty_relevance: "",
    title: "",
    time_required: "",
    description: "",
    name: "",
    logo: "",
    number_of_employees_min: 0,
    number_of_employees_max: 0,
    experience: "",
  });

  // Input change handlers
  const onTitleChange = (event) => {
    setInputs((prevState) => {
      return { ...prevState, title: event.target.value };
    });
  };

  const onDescriptionChange = (event) => {
    setInputs((prevState) => {
      return { ...prevState, description: event.target.value };
    });
  };
  const onExperienceChange = (event) => {
    setInputs((prevState) => {
      return { ...prevState, experience: event.target.value };
    });
  };

  const onCompanyNameChange = (event) => {
    setInputs((prevState) => {
      return {
        ...prevState,
        name: event.target.value,
      };
    });
  };

  const onCompanyLogoChange = (event) => {
    setInputs((prevState) => {
      return {
        ...prevState,
        logo: event,
      };
    });
  };

  const onCompanyNumberMinChange = (event) => {
    setInputs((prevState) => {
      return {
        ...prevState,
        number_of_employees_min: event.target.value,
      };
    });
  };
  const onCompanyNumberMaxChange = (event) => {
    setInputs((prevState) => {
      return {
        ...prevState,
        number_of_employees_max: event.target.value,
      };
    });
  };

  const onTimeRequiredChange = (event) => {
    setInputs((prevState) => {
      return { ...prevState, time_required: event.target.value };
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(inputs);

    props.onAddJob();
  };
  return (
    <div className="add-job">
      <div className="backdrop" onClick={props.onCancel} />
      <Card className="add-job-card">
        <header>
          <Cancel className="add-job-cancel-btn" onClick={props.onCancel} />
          <h2> פרסום משרה</h2>
        </header>
        <Separator />
        <form className="add-job-form" onSubmit={submitHandler}>
          <h4>פרטי משרה</h4>
          <div className="job-details">
            <input
              className="add-job-content"
              type="text"
              placeholder="הכנס כותרת למשרה"
              value={inputs.title}
              onChange={onTitleChange}
              required
            />
            <select
              className="add-job-content"
              onChange={onTimeRequiredChange}
              value={inputs.time_required}
              required
            >
              <option value="">אנא בחרי/י סוג משרה</option>

              {Object.keys(JobTime).map((job) => {
                return (
                  <option value={job} key={Math.random().toString()}>
                    {getJobTime(job)}
                  </option>
                );
              })}
            </select>

            <textarea
              className="add-job-content text"
              type="text"
              value={inputs.description}
              onChange={onDescriptionChange}
              placeholder="הכנס תיאור למשרה"
              required
            />
            <select
              className="add-job-content"
              onChange={onExperienceChange}
              value={inputs.experience}
              required
            >
              <option value="">אנא בחרי/י ניסיון דרוש</option>

              {Object.keys(Experience).map((experience) => {
                return (
                  <option value={experience} key={Math.random().toString()}>
                    {getExperience(experience)}
                  </option>
                );
              })}
            </select>
          </div>
          <Separator />
          <h4>פרטי חברה</h4>
          <div className="company-details">
            <Company className="company-icon" />
            <input
              className="add-job-content"
              type="text"
              placeholder="הכנס שם חברה"
              value={inputs.name}
              onChange={onCompanyNameChange}
              required
            />
            <div className="job-employee">
              <label>אנא הכנס/י כמות עובדים</label>
              <div>
                <input
                  className="add-job-content"
                  type="number"
                  value={inputs.number_of_employees_min}
                  onChange={onCompanyNumberMinChange}
                  required
                />
                <label>-</label>
                <input
                  className="add-job-content"
                  type="number"
                  value={inputs.number_of_employees_max}
                  onChange={onCompanyNumberMaxChange}
                  required
                />
              </div>
            </div>
            <ImageUpload
              className="add-job-img"
              file="companies"
              content="אנא העלה לוגו של החברה"
              onUserImageChange={onCompanyLogoChange}
            />
          </div>
          <Separator />
          <Button className="add-job-btn" type="submit">
            הוסף משרה
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default AddJob;
