import React, { useState, useEffect } from "react";
import "./Job.css";
import Card from "../UI/Card";
import Separator from "../UI/Separator";
import Button from "../UI/Button";
import Suitcase from "../UI/SVG/Suitcase";
import Building from "../UI/SVG/Building";
import CheckList from "../UI/SVG/CheckList";
import Circle from "../UI/SVG/Circle";
import Pin from "../UI/SVG/Pin";
import Send from "../UI/SVG/Send";
import { getUserFromEmail } from "../user/user.ts";
import MiniProfile from "../user/miniProfile";
import SendCv from "./SendCv";
const Job = (props) => {
  const [sendOpen, setSendOpen] = useState(false);

  const toggleSendOpen = () => {
    setSendOpen((prev) => {
      return !prev;
    });
  };

  // const isAuthor = props.publisher_email === props.user.user_email;
  const [user, setUser] = useState("");
  const [openAuthor, setOpenAuthor] = useState(false);

  const jobClicked = () => {
    props.onClickJob(props.job_id);
  };

  useEffect(() => {
    const getUser = async () => {
      let user = await getUserFromEmail({
        token: sessionStorage.getItem("token"),
        email: props.publisher_email,
      });
      setUser(user);
    };
    getUser();
  }, []);
  //TODO

  const onImg = () => {
    setOpenAuthor((prev) => {
      return !prev;
    });
  };
  const onSave = async () => {
    // let config=getConfig(sessionStorage.getItem("token"));
    // let saveJobRequest= await axios.post()
  };

  const list = props.isList;
  const open = props.isOpen;
  const chosen = props.isChosen;
  const num_of_employees = props.company.number_of_employees.split("-");
  let published_time = props.published_time + "";
  published_time = published_time.substr(0, 10).split("-");
  published_time =
    published_time[2] + "/" + published_time[1] + "/" + published_time[0];
  return (
    <Card
      className={`job-card columns ${!list && !open && "close"} ${
        list && "list"
      } ${chosen && "chosen"}`}
      onClick={props.onClickJob && jobClicked}
    >
      {sendOpen && (
        <SendCv onCancel={toggleSendOpen} onSubmit={props.onSubmit} />
      )}
      {openAuthor && <MiniProfile onCancel={onImg} user={user} />}
      <header className="job-header columns">
        {!list && <Pin className="job-pin" />}{" "}
        {/* {isAuthor && (
          <Button className="job-delete" onClick={onDelete}>
            מחק משרה
          </Button>
        )} */}
        <div className="job-title rows">
          <img src={props.company.logo} alt="לוגו של החברה" />
          <div className="job-title columns">
            <h2>{props.title}</h2>
            <ul className="job-details rows">
              <li>{props.applies} הגישו מועמודות</li>
              <li>
                <Circle />
              </li>
              <li>{published_time}</li>
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
              {num_of_employees[0] + "-" + num_of_employees[1] + " עובדים"}
            </div>
            <Building className="detail-icon" />
          </li>
          <li className="job-detail rows">
            <div>{props.publisher_email}</div>
            <img
              onClick={onImg}
              className="detail-icon"
              src={user.user_image}
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
          <Button className="job-send" onClick={toggleSendOpen}>
            הגש מועמדות
            <Send />
          </Button>
        </div>
      )}
    </Card>
  );
};

export default Job;
