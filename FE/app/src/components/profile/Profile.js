import React, { useState, useEffect } from "react";
import "./Profile.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { faCakeCandles } from "@fortawesome/free-solid-svg-icons";
import { faSchool } from "@fortawesome/free-solid-svg-icons";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import { faBriefcase } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { getUserFromJWT, getUserProfile } from "../user/user.ts";
import Card from "../UI/Card";
import { getFaculty, getYear, Faculty, Year } from "../enums/enums.ts";
import Separator from "../UI/Separator";
import Edit from "../UI/SVG/Edit";
import Button from "../UI/Button";

const Profile = (props) => {
  const [userData, setUserData] = useState(props.user);
  // {
  //   user:,
  //   posts: {},
  //   jobs: {},
  // });
  const [editMode, setEditMode] = useState(false);
  let isWorked = userData.job_start_year !== 0;
  const [checked, setChecked] = useState(isWorked);

  const editBtnClicked = () => {
    if (editMode) {
      setUserData(props.user);
    }
    setEditMode((prev) => {
      return !prev;
    });
  };

  const onRemoveImg = () => {
    setUserData((prev) => {
      return { ...prev, user_image: "./anonymousImg.png" };
    });
  };

  const covertToBase64 = (e) => {
    let newPath = e.target.value.replace("C:\\fakepath\\", "./users/");

    setUserData((prev) => {
      return { ...prev, user_image: newPath };
    });
  };
  const onUpdate = () => {
    console.log("updating to: ", userData);
    try {
      fetch("http://localhost:8080/profile", {
        method: "PATCH",
        headers: {
          Authorization: "Bearer " + props.user.token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          faculty: userData.faculty,
          year: userData.year,
          job_company_name: userData.job_company_name,
          job_start_year: userData.job_start_year,
          job_description: userData.job_description,
          user_image: userData.user_image,
        }),
      }).then((profileRequest) => {
        if (profileRequest !== undefined && profileRequest.status === 200) {
          console.log("profileRequest- succeed ");
          // TODO- GET NEW TOKEN
          //  props.onUpdateUser(profileRequest.token);
          setEditMode(false);
        }
      });
    } catch (err) {
      console.log(err);
      console.log("profile update request failed");
    }
  };

  // Input change handlers
  const onMailChange = (event) => {
    setUserData((prevState) => {
      return { ...prevState, user_email: event.target.value };
    });
  };

  // const onPassChange = (event) => {
  //   setInputs((prevState) => {
  //     return { ...prevState, password: event.target.value };
  //   });
  // };
  // const onConfirmPassChange = (event) => {
  //   setInputs((prevState) => {
  //     return { ...prevState, confirmPassword: event.target.value };
  //   });
  // };
  const onFirstNameChange = (event) => {
    setUserData((prevState) => {
      return { ...prevState, private_name: event.target.value };
    });
  };

  const onLastNameChange = (event) => {
    setUserData((prevState) => {
      return { ...prevState, last_name: event.target.value };
    });
  };
  const onBirthdayDateChange = (event) => {
    setUserData((prevState) => {
      return { ...prevState, birthday_date: event.target.value };
    });
  };
  const onFacultyChange = (event) => {
    setUserData((prevState) => {
      return { ...prevState, faculty: event.target.value };
    });
  };

  const onYearChange = (event) => {
    setUserData((prevState) => {
      return { ...prevState, year: event.target.value };
    });
  };

  const onCheckBox = () => {
    if (checked) {
      setUserData((prevState) => {
        return {
          ...prevState,
          job_company_name: props.user.job_company_name,
          job_start_year: props.user.job_start_year,
          job_description: props.user.job_description,
        };
      });
    }
    setChecked((prev) => {
      return !prev;
    });
  };
  const onJobCompanyNameChange = (event) => {
    setUserData((prevState) => {
      return { ...prevState, job_company_name: event.target.value };
    });
  };

  const onJobStartYearChange = (event) => {
    setUserData((prevState) => {
      return { ...prevState, job_start_year: event.target.value };
    });
  };
  const onJobDescriptionChange = (event) => {
    setUserData((prevState) => {
      return { ...prevState, job_description: event.target.value };
    });
  };
  const onUserImageChange = (event) => {
    setUserData((prevState) => {
      return { ...prevState, user_image: event };
    });
  };
  const currentDate = new Date();
  return (
    <div className="profile">
      <Card className="userCard">
        <header>
          {!editMode && <Edit className="edit-icon" onClick={editBtnClicked} />}
          <div className="fields">
            <h2 className="userCard-title">
              {userData.private_name + " " + userData.last_name}
            </h2>
            <div className="userCard-fields">
              <FontAwesomeIcon
                icon={faEnvelope}
                className="profile-icon"
                size="lg"
              />
              <span>{userData.user_email}</span>
            </div>
            <div className="userCard-fields">
              <FontAwesomeIcon
                icon={faCakeCandles}
                size="lg"
                className="profile-icon"
              />
              <span>{userData.birthday_date}</span>
            </div>
            <div className="userCard-fields">
              <FontAwesomeIcon
                icon={faSchool}
                size="lg"
                className="profile-icon"
              />
              {editMode ? (
                <select
                  className="edit-content"
                  onChange={onFacultyChange}
                  value={userData.faculty}
                  required
                >
                  {Object.keys(Faculty).map((faculty) => {
                    switch (faculty) {
                      case Faculty.ComputerScience:
                        return (
                          <option
                            value={faculty}
                            key={Math.random().toString()}
                          >
                            מדעי המחשב
                          </option>
                        );
                      case Faculty.Economy:
                        return (
                          <option
                            value={faculty}
                            key={Math.random().toString()}
                          >
                            כלכלה
                          </option>
                        );
                      case Faculty.Psychology:
                        return (
                          <option
                            value={faculty}
                            key={Math.random().toString()}
                          >
                            פסיכולוגיה
                          </option>
                        );
                      case Faculty.Social:
                        return (
                          <option
                            value={faculty}
                            key={Math.random().toString()}
                          >
                            סוציולוגיה
                          </option>
                        );
                      default:
                        return {};
                    }
                  })}
                </select>
              ) : (
                <span>{getFaculty(userData.faculty)} </span>
              )}
            </div>
            <div className="userCard-fields">
              <FontAwesomeIcon
                icon={faCalendar}
                size="lg"
                className="profile-icon"
              />
              {editMode ? (
                <select
                  className="edit-content"
                  onChange={onYearChange}
                  value={userData.year}
                  required
                >
                  {Object.keys(Year).map((year) => {
                    switch (year) {
                      case Year.First:
                        return (
                          <option value={year} key={Math.random().toString()}>
                            שנה ראשונה
                          </option>
                        );
                      case Year.Second:
                        return (
                          <option value={year} key={Math.random().toString()}>
                            שנה שנייה
                          </option>
                        );
                      case Year.Third:
                        return (
                          <option value={year} key={Math.random().toString()}>
                            שנה שלישית
                          </option>
                        );
                      case Year.Fourth:
                        return (
                          <option value={year} key={Math.random().toString()}>
                            שנה רביעית
                          </option>
                        );
                      case Year.Fifth:
                        return (
                          <option value={year} key={Math.random().toString()}>
                            שנה חמישית
                          </option>
                        );
                      case Year.Graduated:
                        return (
                          <option value={year} key={Math.random().toString()}>
                            סיימתי את הלימודים
                          </option>
                        );

                      default:
                        return {};
                    }
                  })}
                </select>
              ) : (
                <span>{getYear(userData.year)}</span>
              )}
            </div>
            {editMode && (
              <div className="checkBox-div">
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={onCheckBox}
                />
                <label>אני עובד/ת</label>
              </div>
            )}
          </div>
          <div className="profile-img">
            <img src={userData.user_image} alt="תמונה של המשתמש" />
            {editMode && (
              <div>
                <div className="auth-inner" style={{ width: "auto" }}>
                  <input
                    accept="image/*"
                    type="file"
                    onChange={covertToBase64}
                  />
                </div>
                <Button className="remove-img edit-btn" onClick={onRemoveImg}>
                  מחק תמונה
                </Button>
              </div>
            )}
          </div>
        </header>
        {checked && (
          <div>
            <Separator />
            <div className="job-details">
              <div className="userCard-fields">
                <FontAwesomeIcon
                  icon={faBriefcase}
                  size="lg"
                  className="profile-icon"
                />
                <span>פרטי עבודה:</span>
              </div>
              {!editMode && (
                <p>
                  עובד ב-{userData.job_company_name} משנת{" "}
                  {userData.job_start_year}
                </p>
              )}
              {!editMode && <p>תיאור עבודה: {userData.job_description}</p>}
              {editMode && (
                <input
                  onChange={onJobCompanyNameChange}
                  value={userData.jobCompanyName}
                  placeholder={
                    isWorked
                      ? `שם מקום עבודה: ${userData.job_company_name}`
                      : "שם מקום עבודה"
                  }
                  className="edit-content"
                  type="text"
                  required
                />
              )}
              {editMode && (
                <input
                  onChange={onJobStartYearChange}
                  value={userData.jobStartYear}
                  placeholder={
                    isWorked
                      ? `שנת התחלת עבודה: ${userData.job_start_year}`
                      : "שנת התחלת עבודה"
                  }
                  className="edit-content"
                  type="number"
                  max={currentDate.getFullYear()}
                  min="1900"
                  required
                />
              )}
              {editMode && (
                <textarea
                  onChange={onJobDescriptionChange}
                  value={userData.jobDescription}
                  placeholder={
                    isWorked
                      ? `תיאור מקום עבודה: \n ${userData.job_description}`
                      : "תיאור מקום עבודה"
                  }
                  className="edit-content"
                  type="text"
                  required
                />
              )}
            </div>
          </div>
        )}
        {editMode && (
          <footer>
            <Separator />
            <div className="edit-actions">
              <Button onClick={editBtnClicked} className="edit-btn">
                ביטול
              </Button>
              <Button onClick={onUpdate} className="edit-btn">
                שמור
              </Button>
            </div>
          </footer>
        )}
      </Card>
    </div>
  );
};
export default Profile;
