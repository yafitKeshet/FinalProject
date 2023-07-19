import React, { useState } from "react";
import "./SendCv.css";
import Card from "../UI/Card";
import Cancel from "../UI/SVG/Cancel";
import Separator from "../UI/Separator";
import Button from "../UI/Button";
import Send from "../UI/SVG/Send";
import { getConfig } from "../user/user.ts";
import axios from "axios";

const SendCv = (props) => {
  const [file, setFile] = useState(null);

  const onSubmit = async () => {
    const formData = new FormData();
    formData.append("cv_file", file, "cv_file");
    console.log(formData);
    try {
      const config = getConfig(sessionStorage.getItem("token"));
      let applyJobRequest = await axios.post(
        "http://localhost:8080/jobs/apply?publisher_email=yafitmi@mta.ac.il",

        formData,
        config
      );

      if (applyJobRequest !== undefined && applyJobRequest.status === 200) {
        alert("קורות החיים שלך נשלחו בהצלחה!");
        console.log("cv send successfully");
        props.onSubmit();
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="upload-cv">
      <div className="backdrop">
        <Card className="upload-cv-card">
          <header>
            <Cancel className="upload-cv-cancel-btn" onClick={props.onCancel} />
            <h2> העלאת קורות חיים</h2>
          </header>
          <Separator />
          <input type="file" onChange={(e) => setFile(e.target.files[0])} />
          <Button className="job-send upload-cv-btn" onClick={onSubmit}>
            שלח מועמדות <Send />
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default SendCv;
