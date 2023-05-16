import React from "react";
import Card from "../UI/Card";
import Button from "../UI/Button";
import Separator from "../UI/Separator";

import "./ForgetPassword.css";

const ForgetPassword = (props) => {
  return (
    <form className="forget-form">
      <div className="backdrop" onClick={props.onCancel} />
      <Card className="forget-card">
        <header className="forget-header">
          <h2>איתור החשבון שלך</h2>
        </header>
        <Separator />

        <div className="forget-contents">
          <label className="forget-content">
            יש להזין את כתובת הדוא"ל כדי לחפש את החשבון שלך.
          </label>

          <input
            className="forget-content"
            type="email"
            placeholder="some@mta.ac.il"
            pattern="[a-zA-Z0-9._%+-]+@mta.ac.il"
            title="The email should be of the Academic Tel-Aviv Yafo."
            required
          />
        </div>
        <Separator />
        <footer className="forget-actions">
          <Button className="forget-cancel" onClick={props.onCancel}>
            ביטול
          </Button>
          <Button className="forget-send" type="submit">
            חיפוש
          </Button>
        </footer>
      </Card>
    </form>
  );
};

export default ForgetPassword;
