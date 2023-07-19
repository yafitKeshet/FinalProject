import React, { useState, useEffect } from "react";
import "./Profile.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faCakeCandles } from "@fortawesome/free-solid-svg-icons";
import { faSchool } from "@fortawesome/free-solid-svg-icons";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import { faBriefcase } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { getConfig, getUserProfile, getUserFromEmail } from "../user/user.ts";
import Card from "../UI/Card";
import { getFaculty, getYear, Faculty, Year } from "../enums/enums.ts";
import Separator from "../UI/Separator";
import Edit from "../UI/SVG/Edit";
import Button from "../UI/Button";
import Post from "../UI/SVG/Post";
import Jobs from "../UI/SVG/Jobs";
import ProfilePost from "./ProfilePost";
import GenerateCV from "../generateCV/GenerateCV";
import Job from "../jobs/Job";
import Garbage from "../UI/SVG/Garbage";

const Profile = (props) => {
  const [open, setOpen] = useState("userCard");
  const [editMode, setEditMode] = useState(false);
  const [posts, setPosts] = useState({});
  const [userData, setUserData] = useState({});
  const [isWorked, setIsWorked] = useState(false);
  const [checked, setChecked] = useState(false);
  const [createCVOpen, setCreateCVOpen] = useState(false);
  const [jobs, setJobs] = useState({});
  const [savedJobs, setSavedJobs] = useState({});

  const toggleCreateCV = () => {
    setCreateCVOpen((prev) => {
      return !prev;
    });
  };
  const onCardClicked = (card) => {
    // if (open !== card) {
    setEditMode(false);
    setOpen(open === card ? "" : card);
    // }
  };

  /***** USER CARD *****/
  const editBtnClicked = async () => {
    if (editMode) {
      let user = await getUserProfile(sessionStorage.getItem("token"));
      setUserData(user);
      setIsWorked(user.job_start_year !== 0);
      setChecked(user.job_start_year !== 0);
    }
    setEditMode((prev) => {
      return !prev;
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
          props.onUpdateUser({
            token: props.user.token,
            user_name: props.user.user_name,
            user_image: userData.user_image,
            user_email: props.user.user_email,
          });
          setEditMode(false);
        }
      });
    } catch (err) {
      console.log(err);
      console.log("profile update request failed");
    }
  };

  // Input change handlers
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
  const onRemoveImg = () => {
    setUserData((prev) => {
      return { ...prev, user_image: "./anonymousImg.png" };
    });
  };

  const onUserImageChange = (e) => {
    let newPath = e.target.value.replace("C:\\fakepath\\", "./users/");

    setUserData((prev) => {
      return { ...prev, user_image: newPath };
    });
  };

  const currentDate = new Date();

  /***** USER POSTS *****/
  // Calculate Date
  let date = new Date();
  date.setHours(date.getHours() - 3);
  date = date.getTime();

  const getUserPosts = async () => {
    try {
      const config = getConfig(props.user.token);

      let postsRequest = await axios.get("http://localhost:8080/feed", config);

      if (postsRequest !== undefined && postsRequest.status === 200) {
        let filtered = postsRequest.data.filter((post) => {
          return (
            post.author.user_email === props.user.user_email &&
            Math.floor(
              new Date(
                date - new Date(Date.parse(post.published_time)).getTime()
              ) /
                (1000 * 60 * 60 * 24)
            ) < 1
          );
        });
        setPosts(filtered);
      }
    } catch (err) {
      alert("משהו השתבש אנא נסה/נסי שנית");
      console.log("feed request failed");
    }
  };

  /***** USER JOBS *****/

  const getJobs = async () => {
    try {
      const config = getConfig(props.user.token);
      let jobsRequest = await axios.get("http://localhost:8080/jobs", config);
      if (jobsRequest !== undefined && jobsRequest.status === 200) {
        let filtered = jobsRequest.data.filter((job) => {
          return job.publisher_email === props.user.user_email;
        });
        setJobs(filtered);
      }
    } catch (err) {
      console.log(err);
      console.log("job request failed");
    }
  };

  /***** USER SAVED JOBS *****/
  const getSavedJob = async (id) => {
    const config = getConfig(props.user.token);

    try {
      let jobRequest = await axios.get(
        `http://localhost:8080/jobs/${id}`,
        config
      );
      if (jobRequest !== undefined && jobRequest.status === 200) {
        return jobRequest.data;
      }
    } catch (err) {
      console.log(err);
      console.log("get save job request failed");
    }
    return {};
  };
  const getSavedJobs = async (saved_jobs_id) => {
    let saved_jobs = [];
    for (const id of saved_jobs_id) {
      let job = await getSavedJob(id);
      saved_jobs.push(job);
    }
    console.log(saved_jobs);
    setSavedJobs(saved_jobs);
  };

  const deleteSaveJob = async (id) => {
    const config = getConfig(props.user.token);

    try {
      let deleteRequest = await axios.post(
        `http://localhost:8080/jobs/${id}/deleteFromSavedJobs`,
        { job_id: id },
        config
      );
      if (deleteRequest !== undefined && deleteRequest.status === 200) {
        console.log("job deleted from saved jobs");
        alert("המשרה נמחקה מהרשימה שלך בהצלחה!");
        getUserPosts();
      }
    } catch (err) {
      console.log(err);
      console.log("delete save job request failed");
    }
    return "";
  };

  useEffect(() => {
    const getUser = async () => {
      let user = await getUserFromEmail({
        token: sessionStorage.getItem("token"),
        email: sessionStorage.getItem("user_email"),
      });
      setUserData(user);
      setIsWorked(user.job_start_year !== 0);
      setChecked(user.job_start_year !== 0);
      getSavedJobs(user.saved_jobs);
    };
    getUser();
    getUserPosts();
    getJobs();
  }, [deleteSaveJob]);

  return (
    <div className="profile-page">
      <Card className="saved-jobs card">
        <header>
          <h2>משרות ששמרתי:</h2>
        </header>
        <Separator />
        <div className="user-savedJobs">
          {Object.values(savedJobs).map((job) => (
            <Card className="profileJob-card" key={job.id}>
              <Button
                className="delete-saveJob"
                onClick={() => deleteSaveJob(job.id)}
              >
                הסר
                <Garbage className="garbageICN" />
              </Button>
              <Job
                isList={true}
                user={props.user}
                job_id={job.id}
                publisher_email={job.publisher_email}
                published_time={job.published_time}
                applies={job.applies}
                title={job.title}
                time_required={job.time_required}
                description={job.description}
                company={job.company}
                faculty_relevance={job.faculty_relevance}
                experience={job.experience}
                key={job.id}
                onClickJob={props.onClick}
                onSubmit={props.onSubmit}
              />
            </Card>
          ))}
        </div>
      </Card>
      <div className="profile">
        {createCVOpen && (
          <GenerateCV onCancel={toggleCreateCV} onCreate={toggleCreateCV} />
        )}
        <div className="profile-section">
          <Card
            className="profile-card card"
            onClick={() => {
              onCardClicked("userCard");
            }}
          >
            <div>
              <FontAwesomeIcon
                icon={faUser}
                className="profile-icon"
                size="lg"
              />
              <h2> פרטי פרופיל</h2>
            </div>
          </Card>
          <Card
            className={`userCard ${
              open === "userCard" ? "open" : "close"
            }  card`}
          >
            <header className="open">
              <div className="userCard-buttons">
                {!editMode && (
                  <Edit className="edit-icon" onClick={editBtnClicked} />
                )}
                <Button className="create-CV-btn" onClick={toggleCreateCV}>
                  יצירת קורות חיים
                </Button>
              </div>
              <div className="fields">
                <h2 className="userCard-title">{props.user.user_name}</h2>
                <div className="userCard-fields">
                  <FontAwesomeIcon
                    icon={faEnvelope}
                    className="profile-icon"
                    size="lg"
                  />
                  <span>{props.user.user_email}</span>
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
                              <option
                                value={year}
                                key={Math.random().toString()}
                              >
                                שנה ראשונה
                              </option>
                            );
                          case Year.Second:
                            return (
                              <option
                                value={year}
                                key={Math.random().toString()}
                              >
                                שנה שנייה
                              </option>
                            );
                          case Year.Third:
                            return (
                              <option
                                value={year}
                                key={Math.random().toString()}
                              >
                                שנה שלישית
                              </option>
                            );
                          case Year.Fourth:
                            return (
                              <option
                                value={year}
                                key={Math.random().toString()}
                              >
                                שנה רביעית
                              </option>
                            );
                          case Year.Fifth:
                            return (
                              <option
                                value={year}
                                key={Math.random().toString()}
                              >
                                שנה חמישית
                              </option>
                            );
                          case Year.Graduated:
                            return (
                              <option
                                value={year}
                                key={Math.random().toString()}
                              >
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
                        onChange={onUserImageChange}
                      />
                    </div>
                    <Button
                      className="remove-img edit-btn"
                      onClick={onRemoveImg}
                    >
                      מחק תמונה
                    </Button>
                  </div>
                )}
              </div>
            </header>
            {checked && (
              <div className="userCard-section open">
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
              <footer className="userCard-section open">
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
        <div className="profile-section">
          <Card
            className="profile-card card"
            onClick={() => {
              onCardClicked("userPosts");
            }}
          >
            <div>
              <Post className="profile-icon" />
              <h2> פוסטים</h2>
            </div>
          </Card>
          <Card
            className={`userPosts ${
              open === "userPosts" ? "open" : "close"
            } card`}
          >
            <div className="userPost-posts open">
              {Object.values(posts).map((post) => (
                <ProfilePost
                  user={props.user}
                  authorMail={post.author.user_email}
                  date="19/06/2023"
                  img={post.author.user_image}
                  likes={post.likes}
                  id={post.post_id}
                  title={post.title}
                  author={
                    post.author.private_name + " " + post.author.last_name
                  }
                  content={post.content}
                  key={Math.random()}
                  onDeletePost={getUserPosts}
                />
              ))}
            </div>
          </Card>{" "}
        </div>
        <div className="profile-section">
          <Card
            className="profile-card card"
            onClick={() => {
              onCardClicked("userJobs");
            }}
          >
            <div>
              <Jobs className="profile-icon" />
              <h2> משרות</h2>
            </div>
          </Card>
          <Card
            className={`userJobs ${
              open === "userJobs" ? "open" : "close"
            } card`}
          >
            <div className="userJob-jobs open">
              {Object.values(jobs).map((job) => (
                <Card className="profileJob-card" key={job.id}>
                  <Job
                    isList={true}
                    user={props.user}
                    job_id={job.id}
                    publisher_email={job.publisher_email}
                    published_time={job.published_time}
                    applies={job.applies}
                    title={job.title}
                    time_required={job.time_required}
                    description={job.description}
                    company={job.company}
                    faculty_relevance={job.faculty_relevance}
                    experience={job.experience}
                    key={job.id}
                    onClickJob={props.onClick}
                    onSubmit={props.onSubmit}
                  />
                </Card>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
export default Profile;
