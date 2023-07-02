import React from "react";
import "./Job.css";
import Card from "../UI/Card";
import Separator from "../UI/Separator";
import Button from "../UI/Button";
// import axios from "axios";
// import { getConfig } from "../user/user.ts";
import Suitcase from "../UI/SVG/Suitcase";
import Building from "../UI/SVG/Building";
import CheckList from "../UI/SVG/CheckList";
import Circle from "../UI/SVG/Circle";
import Pin from "../UI/SVG/Pin";
import Send from "../UI/SVG/Send";
/*
 user={props.user}
      job_id="string"
      publisher_email="string"
      published_time="2023-06-21T07:10:05.037Z"
      applies={0}
      title="string"
      time_required="FullTime"
      description="string"
      company={company}
      faculty_relevance="ComputerScience"
      experience="Junior"
      key={Math.random()}
      onDeleteJob={getJobs}

      const company = {
      name: "string",
      logo: "string",
      number_of_employees: ["string", "string"],
  };
*/
const Job = (props) => {
  const isAuthor = props.publisher_email === props.user.user_email;

  const jobClicked = () => {
    console.log("clickkkkkk");
    props.onClickJob(props.job_id);
  };
  //TODO

  const onDelete = () => {};
  const onImg = () => {};
  const onSave = () => {};
  const onSubmit = () => {};

  const list = props.isList;
  const open = props.isOpen;
  const chosen = props.isChosen;
  return (
    <Card
      className={`job-card columns ${!list && !open && "close"} ${
        list && "list"
      } ${chosen && "chosen"}`}
      onClick={props.onClickJob && jobClicked}
    >
      <header className="job-header columns">
        {!list && <Pin className="job-pin" />}{" "}
        {isAuthor && (
          <Button className="job-delete" onClick={onDelete}>
            מחק משרה
          </Button>
        )}
        <div className="job-title rows">
          <img src={props.company.logo} alt="לוגו של החברה" />
          <div className="job-title columns">
            <h2>{props.title}</h2>
            <ul className="job-details rows">
              <li>{props.applies} הגישו מועמודות</li>
              <li>
                <Circle />
              </li>
              <li>{props.published_time}</li>
              <li>
                <Circle />
              </li>
              <li>{props.company.name}</li>
            </ul>
          </div>
        </div>
        <ul className="job-details columns">
          <li className="job-detail rows">
            <div>{props.time_required}</div>
            <Suitcase className="detail-icon" />
          </li>
          <li className="job-detail rows">
            <div>
              {props.company.number_of_employees[0] +
                "-" +
                props.company.number_of_employees[1] +
                " עובדים"}
            </div>
            <Building className="detail-icon" />
          </li>
          <li className="job-detail rows">
            <div>{props.publisher_email}</div>
            <img
              onClick={onImg}
              className="detail-icon"
              src={props.publish_image}
              alt="תמונה של מפרסם המשרה"
            />
          </li>
          <li className="job-detail rows">
            <div>{props.experience}</div>
            <CheckList className="detail-icon" />
          </li>
        </ul>
      </header>
      {open && <Separator />}
      {open && (
        <div className="job-contents">
          <div>{props.description}</div>
        </div>
      )}
      {open && <Separator />}
      {open && (
        <div className="job-actions">
          <Button className="job-save" onClick={onSave}>
            שמירת משרה
          </Button>
          <Button className="job-send" onClick={onSubmit}>
            הגש מועמדות
            <Send />
          </Button>
        </div>
      )}
    </Card>
  );
};

export default Job;
