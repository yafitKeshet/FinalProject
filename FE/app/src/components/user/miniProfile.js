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
import { Faculty, Year as CollegeYear } from "../enums/enums.ts";

const MiniProfile = (props) => {
  const onCancel = () => {
    props.onCancel(false);
  };
  return (
    <div className="mini-profile">
      <div className="backdrop" onClick={onCancel} />
      <Card className="mini-profile-card">
        <header className="mini-profile-header">
          <Cancel className="mini-profile-cancel-btn" onClick={onCancel} />
          <img src={props.user.user_image} alt="תמונה של המשתמש" />
          <h2> {props.user.private_name + " " + props.user.last_name}</h2>
        </header>
        <Separator />
        <div className="mini-profile-contents">
          <div className="mini-profile-content">
            <div>{props.user.user_email}</div>
            <Mail className="mini-profile-icon" />
          </div>
          <div className="mini-profile-content">
            <div>{props.user.birthday_date}</div>
            <Birthday className="mini-profile-icon" />
          </div>
          <div className="mini-profile-content">
            <div>{props.user.faculty}</div>
            <College className="mini-profile-icon" />
          </div>
          <div className="mini-profile-content">
            <div>{props.user.year}</div>
            <Year className="mini-profile-icon" />
          </div>
          <div className="mini-profile-content">
            <div>{props.user.job_company_name}</div>
            <Job className="mini-profile-icon" />
          </div>
        </div>
      </Card>
    </div>
  );
};
export default MiniProfile;
