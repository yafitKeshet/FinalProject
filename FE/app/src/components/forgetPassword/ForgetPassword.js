import React, { useState } from "react";
import Card from "../UI/Card";
import Button from "../UI/Button";
import Separator from "../UI/Separator";

import "./ForgetPassword.css";

const ForgetPassword = (props) => {
  const [steps, setSteps] = useState({
    step1: true,
    step2: false,
    step3: false,
    step4: false,
    step5: false,
  });

  return (
    <form className="forget-form">
      <div className="backdrop" onClick={props.onCancel} />
      <Card className="forget-card">
        <header className="forget-header">
          <h2> {steps.step1 && "איתור החשבון שלך"}</h2>
        </header>
        <Separator />

        <div className="forget-contents">
          {steps.step1 && (
            <label className="forget-content">
              {steps.step1 &&
                `	
יש להזין את כתובת הדוא"ל או מספר הטלפון כדי לחפש את החשבון שלך.`}
            </label>
          )}

          {steps.step1 && (
            <input
              className="forget-content"
              type="email"
              placeholder="some@mta.ac.il"
              pattern="[a-zA-Z0-9._%+-]+@mta.ac.il"
              title="The email should be of the Academic Tel-Aviv Yafo."
              required
            />
          )}
        </div>
        <Separator />
        <footer className="forget-actions">
          <Button className="forget-cancel" onClick={props.onCancel}>
            ביטול
          </Button>
          <Button className="forget-send" type="submit">
            {steps.step1 && "חיפוש"}
          </Button>
        </footer>
      </Card>
    </form>
  );
};

export default ForgetPassword;
