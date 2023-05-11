import "./LoginForm.css";
import React, { useState } from "react";
import Button from "../UI/Button";
import Card from "../UI/Card";
import Separator from "../UI/Separator";

const LoginForm = (props) => {
  // Input Colors
  const [passBorderColor, setPassBorderColor] = useState("#ccc");
  const [passBackgroundColor, setPassBackgroundColor] = useState("");
  const [confirmPassBorderColor, setConfirmPassBorderColor] = useState("#ccc");
  const [confirmPassBackgroundColor, setConfirmPassBackgroundColor] =
    useState("");

  // Input fields
  const [mailBorderColor, setMailBorderColor] = useState("#ccc");
  const [mailBackgroundColor, setMailBackgroundColor] = useState("");
  const [enteredMail, setEnteredMail] = useState("");
  const [enteredPass, setEnteredPass] = useState("");
  const [enteredConfirmPass, setEnteredConfirmPass] = useState("");

  // Input fields handlers
  const mailChangeHandler = (event) => {
    let isValid =
      event.target.value.endsWith("@mta.ac.il") &&
      event.target.value.length > 10;
    setEnteredMail(event.target.value);
    setMailBorderColor(isValid ? "green" : "red");
    setMailBackgroundColor(isValid ? "rgb(117, 250, 113)" : "#f86262");
  };
  const passChangeHandler = (event) => {
    let isValid = event.target.value.length > 0;
    setEnteredPass(event.target.value);
    setPassBorderColor(isValid ? "green" : "red");
    setPassBackgroundColor(isValid ? "rgb(117, 250, 113)" : "#f86262");
  };

  const confirmPassChangeHandler = (event) => {
    let isValid =
      event.target.value.length > 0 && event.target.value === enteredPass;
    setEnteredConfirmPass(event.target.value);
    setConfirmPassBorderColor(isValid ? "green" : "red");
    setConfirmPassBackgroundColor(isValid ? "rgb(117, 250, 113)" : "#f86262");
  };

  // Login handler
  const submitHandler = (event) => {
    event.preventDefault();

    // TODO
    // const userData = {
    //   mail: enteredMail,
    //   pass: enteredPass,
    // };

    setEnteredMail("");
    setEnteredPass("");
    setEnteredConfirmPass("");

    // TODO
    props.onLogIn(true);
    // props.onSaveUser(userData);
  };

  // Register handler
  // TODO

  return (
    <form className="login-form" onSubmit={submitHandler}>
      <Card className="form-card">
        <div className="login-controls">
          <div className="login-control">
            <label>מייל</label>
            <input
              type="text"
              value={enteredMail}
              onChange={mailChangeHandler}
              placeholder="some@mta.ac.il"
              pattern="[a-z0-9._%+-]+@mta.ac.il"
              title="The email should be of the Academic Tel-Aviv Yafo."
              style={{
                border: `2px solid ${mailBorderColor}`,
                backgroundColor: `${mailBackgroundColor}`,
              }}
              required
            ></input>
          </div>
          <div className="login-control">
            <label>סיסמא</label>
            <input
              type="password"
              value={enteredPass}
              onChange={passChangeHandler}
              style={{
                border: `2px solid ${passBorderColor}`,
                backgroundColor: `${passBackgroundColor}`,
              }}
              required
            ></input>
          </div>
          <div className="login-control">
            <label>אימות סיסמא</label>
            <input
              type="password"
              value={enteredConfirmPass}
              onChange={confirmPassChangeHandler}
              pattern={enteredPass.toString()}
              style={{
                border: `2px solid ${confirmPassBorderColor}`,
                backgroundColor: `${confirmPassBackgroundColor}`,
              }}
              title="Password not match."
              required
            ></input>
          </div>
        </div>

        <div className="login-actions">
          {/* TODO: onClick */}
          <Button className="login-btn btn" type="submit">
            התחברות
          </Button>

          {/* TODO: onClick */}
          <Button className="forgotPass-btn btn">שכחתי סיסמא</Button>
          <Separator />
          {/* TODO: onClick */}
          <Button className="register-btn btn">
            <p>
              אין לך משתמש?
              <br />
              <b> הירשם</b>
            </p>
          </Button>
        </div>
      </Card>
    </form>
  );
};

export default LoginForm;
