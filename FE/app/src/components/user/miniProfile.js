import React from "react";
import "./miniProfile.css";
import Card from "../UI/Card";
import Separator from "../UI/Separator";
import Cancel from "../UI/SVG/Cancel";
import Mail from "../UI/SVG/Mail";
import Birthday from "../UI/SVG/Birthday";
import College from "../UI/SVG/College";
import Year from "../UI/SVG/Year";
import Job from "../UI/SVG/Job";
import { getFaculty, getYear } from "../enums/enums.ts";

const MiniProfile = (props) => {
  const onCancel = () => {
    props.onCancel(false);
  };
  console.log(props.user);
  return (
    <div className="mini-profile">
      <div className="backdrop" onClick={onCancel} />
      <Card className="mini-profile-card">
        <header className="mini-profile-header">
          <Cancel className="mini-profile-cancel-btn" onClick={onCancel} />
          <img
            className="mini-profile-img"
            src={props.user.user_image}
            alt="תמונה של המשתמש"
          />
          <h2> {props.user.private_name + " " + props.user.last_name}</h2>
        </header>
        <Separator />
        <div className="mini-profile-contents">
          <div className="mini-profile-content">
            <Mail className="mini-profile-icon" />
            <div>{props.user.user_email}</div>
          </div>
          <div className="mini-profile-content">
            <Birthday className="mini-profile-icon" />
            <div>{props.user.birthday_date}</div>
          </div>
          <div className="mini-profile-content">
            <College className="mini-profile-icon" />
            <div>{getFaculty(props.user.faculty)}</div>
          </div>
          <div className="mini-profile-content">
            <Year className="mini-profile-icon" />
            <div>{getYear(props.user.year)}</div>
          </div>
          {props.user.job_start_year !== 0 && (
            <div className="mini-profile-content">
              <Job className="mini-profile-icon" />
              <div>
                {props.user.job_company_name}, החל מ-{props.user.job_start_year}
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};
export default MiniProfile;
