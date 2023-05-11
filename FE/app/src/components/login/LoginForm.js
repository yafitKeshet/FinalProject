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

    // const userData = {
    //   mail: enteredMail,
    //   pass: enteredPass,
    // };

    setEnteredMail("");
    setEnteredPass("");
    setEnteredConfirmPass("");

    props.onLogIn(true);
    // props.onSaveUser(userData);
  };

  return (
    <div className="login-page">
      <img
        className="login-img"
        src="https://www.mta.ac.il/he-il/PublishingImages/Lists/Plazma/AllItems/549A2139_RAW.jpg"
        alt="תמונה של האקדמית"
      ></img>
      <form onSubmit={submitHandler}>
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
                required
              ></input>
            </div>
            <div className="login-control">
              <label>סיסמא</label>
              <input
                type="text"
                value={enteredPass}
                onChange={passChangeHandler}
                required
              ></input>
            </div>
            <div className="login-control">
              <label>אימות סיסמא</label>
              <input
                type="text"
                value={enteredConfirmPass}
                onChange={confirmPassChangeHandler}
                required
              ></input>
            </div>
          </div>

          <div className="login-actions">
            <Button className="login-btn" type="submit">
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
    </div>
  );
};

export default LoginForm;
