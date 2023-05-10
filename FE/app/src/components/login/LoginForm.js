import "./LoginForm.css";
import React, { useState } from "react";
import Button from "../UI/Button";
import Card from "../UI/Card";

const LoginForm = (props) => {
  const [enteredMail, setEnteredMail] = useState("");
  const [enteredPass, setEnteredPass] = useState("");
  const [enteredConfirmPass, setEnteredConfirmPass] = useState("");

  const mailChangeHandler = (event) => {
    setEnteredMail(event.target.value);
  };
  const passChangeHandler = (event) => {
    setEnteredPass(event.target.value);
  };
  const confirmPassChangeHandler = (event) => {
    setEnteredConfirmPass(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const userData = {
      mail: enteredMail,
      pass: enteredPass,
    };

    setEnteredMail("");
    setEnteredPass("");
    setEnteredConfirmPass("");

    props.onSaveUser(userData);
  };

  return (
    <form onSubmit={submitHandler}>
      <Card className="form-card">
        <div className="login-controls">
          <div className="login-control">
            <label>מייל</label>
            <input
              type="text"
              value={enteredMail}
              onChange={mailChangeHandler}
            ></input>
          </div>
          <div className="login-control">
            <label>סיסמא</label>
            <input
              type="text"
              value={enteredPass}
              onChange={passChangeHandler}
            ></input>
          </div>
          <div className="login-control">
            <label>אימות סיסמא</label>
            <input
              type="text"
              value={enteredConfirmPass}
              onChange={confirmPassChangeHandler}
            ></input>
          </div>
        </div>

        <div className="login-actions">
          <Button classname="login-btn" type="submit">
            התחברות
          </Button>
          <Button className="register-btn">
            <p>
              אין לך משתמש?
              <br />
              לחץ להרשמה
            </p>{" "}
          </Button>
        </div>
      </Card>
    </form>
  );
};

export default LoginForm;
