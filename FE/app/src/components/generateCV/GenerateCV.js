import React, { useState } from "react";
import Card from "../UI/Card";
import "./GenerateCV.css";
import Cancel from "../UI/SVG/Cancel";
import Separator from "../UI/Separator";
import Button from "../UI/Button";
import { getConfig } from "../user/user.ts";
import axios from "axios";

const GenerateCv = (props) => {
  // INPUTS
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    private_email: "",
    phone: "",
    summary: "",
    job_title: "",
    skills: [""],
    jobs: [],
    education: [],
  });

  // Input change handlers
  const handleChange = (event, index, type) => {
    const { name, value } = event.target;
    if (type === "jobs") {
      const updatedJobs = [...formData.jobs];
      updatedJobs[index][name] = value;
      setFormData((prevData) => ({
        ...prevData,
        jobs: updatedJobs,
      }));
    } else if (type === "education") {
      const updatedEducation = [...formData.education];
      updatedEducation[index][name] = value;
      setFormData((prevData) => ({
        ...prevData,
        education: updatedEducation,
      }));
    } else if (type === "skills") {
      const updatedSkills = [...formData.skills];
      updatedSkills[index] = value;
      setFormData((prevData) => ({
        ...prevData,
        skills: updatedSkills,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleAddSection = (type) => {
    if (type === "jobs") {
      setFormData((prevData) => ({
        ...prevData,
        jobs: [
          ...prevData.jobs,
          {
            job_title: "",
            company: "",
            start_date: "",
            end_date: "",
            description: "",
          },
        ],
      }));
    } else if (type === "education") {
      setFormData((prevData) => ({
        ...prevData,
        education: [
          ...prevData.education,
          {
            institution: "",
            degree: "",
            start_date: "",
            end_date: "",
          },
        ],
      }));
    } else if (type === "skills") {
      setFormData((prevData) => ({
        ...prevData,
        skills: [...prevData.skills, ""],
      }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const config = getConfig(sessionStorage.getItem("token"));
      const response = await axios.post(
        "http://localhost:8080/profile/resume/0",
        formData,
        config
      );

      if (response.status === 200) {
        // Handle successful response (200 OK)
        console.log("Form submitted successfully!");

        // Download the file
        const blob = new Blob([response.data], {
          type: "application/octet-stream",
        });
        const downloadUrl = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = downloadUrl;
        link.download = "file.pdf";
        link.click();
        URL.revokeObjectURL(downloadUrl);
        window.location.reload();
      } else {
        // Handle other responses
        console.error("Form submission failed:", response);
      }
    } catch (error) {
      if (error.response) {
        // Server responded with an error status code (4xx or 5xx)
        console.error("Form submission failed:", error.response.status);
      } else {
        // Other errors
        console.error("Error submitting form:", error);
      }
    }
    props.onCreate();
  };

  return (
    <div className="generateCV">
      <div className="backdrop" onClick={props.onCancel} />
      <Card className="generateCV-card">
        <header>
          <Cancel className="generateCV-cancel-btn" onClick={props.onCancel} />
          <h2> יצירת קורות חיים</h2>
        </header>
        <Separator />
        <form className="generateCV-form" onSubmit={handleSubmit}>
          <h4>פרטים אישיים</h4>
          <div className="generateCV-user-details">
            <div className="generateCV-content">
              <label>שם פרטי:</label>
              <input
                type="text"
                name="first_name"
                value={formData.first_name}
                onChange={(event) => handleChange(event)}
                required
              />
            </div>
            <div className="generateCV-content">
              <label>שם משפחה:</label>
              <input
                type="text"
                name="last_name"
                value={formData.last_name}
                onChange={(event) => handleChange(event)}
                required
              />
            </div>

            <div className="generateCV-content">
              <label>דוא"ל:</label>
              <input
                type="email"
                name="private_email"
                value={formData.private_email}
                onChange={(event) => handleChange(event)}
                required
              />
            </div>
            <div className="generateCV-content">
              <label>טלפון:</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={(event) => handleChange(event)}
                required
              />
            </div>
          </div>
          <Separator />
          <h4>מידע כללי</h4>
          <div className="generateCV-work-details">
            <div className="generateCV-content">
              <label>ספר על עצמך בקצרה:</label>
              <textarea
                name="summary"
                value={formData.summary}
                type="text"
                onChange={(event) => handleChange(event)}
                required
              />
            </div>
            <div className="generateCV-content">
              <label>אם אתה עובד, הכנס תפקידך:</label>
              <input
                type="text"
                name="job_title"
                value={formData.job_title}
                onChange={(event) => handleChange(event)}
              />
            </div>
          </div>
          <Separator />
          <div className="generateCV-skills-details">
            {formData.jobs.length > 0 && <h4>ניסיון תעסוקתי</h4>}
            <div className="generateCV-content">
              {formData.jobs.map((job, index) => (
                <div key={index}>
                  <h3> תפקיד {index + 1}</h3>

                  <div className="generateCV-content">
                    <label>שם התפקיד:</label>
                    <input
                      type="text"
                      name="job_title"
                      value={job.job_title}
                      onChange={(event) => handleChange(event, index, "jobs")}
                      required
                    />
                  </div>
                  <div className="generateCV-content">
                    <label>שם מקום עבודה:</label>
                    <input
                      type="text"
                      name="company"
                      value={job.company}
                      onChange={(event) => handleChange(event, index, "jobs")}
                      required
                    />
                  </div>
                  <div className="generateCV-content">
                    <label>תאריך תחילת עבודה:</label>
                    <input
                      type="date"
                      name="start_date"
                      value={job.start_date}
                      onChange={(event) => handleChange(event, index, "jobs")}
                      required
                    />
                  </div>

                  <div className="generateCV-content">
                    <label>תאריך סיום עבודה:</label>
                    <input
                      name="end_date"
                      type="date"
                      value={job.end_date}
                      onChange={(event) => handleChange(event, index, "jobs")}
                      required
                    />
                  </div>
                  <div className="generateCV-content">
                    <label>תיאור תפקיד:</label>
                    <textarea
                      name="description"
                      value={job.description}
                      onChange={(event) => handleChange(event, index, "jobs")}
                      required
                    />
                  </div>
                </div>
              ))}
              <Button
                className="generateCV-btn"
                onClick={() => handleAddSection("jobs")}
              >
                הוסף מקום עבודה
              </Button>
            </div>
          </div>
          <Separator />
          <div className="generateCV-skills-details">
            {formData.education.length > 0 && <h4>השכלה</h4>}
            <div className="generateCV-content">
              {formData.education.map((education, index) => (
                <div key={index}>
                  <h3> מוסד {index + 1}</h3>

                  <div className="generateCV-content">
                    <label>שם מוסד לימודים:</label>
                    <input
                      type="text"
                      name="institution"
                      value={education.institution}
                      onChange={(event) =>
                        handleChange(event, index, "education")
                      }
                      required
                    />
                  </div>
                  <div className="generateCV-content">
                    <label>תואר:</label>
                    <input
                      type="text"
                      name="degree"
                      value={education.degree}
                      onChange={(event) =>
                        handleChange(event, index, "education")
                      }
                      required
                    />
                  </div>
                  <div className="generateCV-content">
                    <label>תאריך תחילת לימודים:</label>
                    <input
                      type="date"
                      name="start_date"
                      value={education.start_date}
                      onChange={(event) =>
                        handleChange(event, index, "education")
                      }
                      required
                    />
                  </div>

                  <div className="generateCV-content">
                    <label>תאריך סיום לימודים:</label>
                    <input
                      type="date"
                      name="end_date"
                      value={education.end_date}
                      onChange={(event) =>
                        handleChange(event, index, "education")
                      }
                      required
                    />
                  </div>
                </div>
              ))}
              <Button
                className="generateCV-btn"
                onClick={() => handleAddSection("education")}
              >
                הוסף מוסד לימודים
              </Button>
            </div>
          </div>
          <Separator />
          <div className="generateCV-skills-details">
            <h4>כישורים</h4>
            <div className="generateCV-content">
              <input
                type="text"
                name="skills"
                value={formData.skills[0]}
                onChange={(event) => handleChange(event, 0, "skills")}
                required
              />
              {formData.skills.slice(1).map((skill, index) => (
                <div key={index + 1}>
                  <input
                    type="text"
                    name="skills"
                    value={skill}
                    onChange={(event) =>
                      handleChange(event, index + 1, "skills")
                    }
                  />
                </div>
              ))}
              <Button
                className="generateCV-btn"
                type="submit"
                onClick={() => {
                  const updatedSkills = [...formData.skills, ""];
                  setFormData((prevData) => ({
                    ...prevData,
                    skills: updatedSkills,
                  }));
                }}
              >
                הוסף כישרון
              </Button>
            </div>
          </div>
          <Separator />
          <Button className="generateCV-btn" type="submit">
            צור קורות חיים
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default GenerateCv;
