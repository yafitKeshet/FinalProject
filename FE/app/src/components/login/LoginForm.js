import "./LoginForm.css";
import React, { useState } from "react";
import Button from "../UI/Button";
import Card from "../UI/Card";
import Separator from "../UI/Separator";
import axios from "axios";

const LoginForm = (props) => {
  // Input Colors
  const [passBorderColor, setPassBorderColor] = useState("#ccc");
  const [passBackgroundColor, setPassBackgroundColor] = useState("");

  // Input fields
  const [mailBorderColor, setMailBorderColor] = useState("#ccc");
  const [mailBackgroundColor, setMailBackgroundColor] = useState("");
  const [enteredMail, setEnteredMail] = useState("");
  const [enteredPass, setEnteredPass] = useState("");

  // Input fields handlers
  const mailChangeHandler = (event) => {
    let isValid =
      event.target.value.match("[a-z0-9._%+-]+@mta.ac.il") &&
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

  // Login handler
  const submitHandler = async (event) => {
    event.preventDefault();

    // 1. Check if mail existing- userValidation.
    // 2. Check if mail and password existing- login.
    let checkMailRequest = null;

    try {
      checkMailRequest = await axios.get(
        "http://localhost:8080/userValidation?user_email=" + enteredMail
      );
      if (checkMailRequest !== undefined && checkMailRequest.status === 200) {
        // user mail exists, need to check password
        console.log("user mail exists, checking password");
        try {
          let checkPasswordRequest = await axios.post(
            "http://localhost:8080/login",
            {
              user_email: enteredMail,
              password: enteredPass,
            }
          );

          if (
            checkPasswordRequest !== undefined &&
            checkPasswordRequest.status === 200
          ) {
            // good to go (mail and password are correct)
            console.log("good to go (mail and password are correct)");
            let token = checkPasswordRequest.data.jwt_token; // user token
            token = token.replace(/(?:\r\n|\r|\n)/g, "");

            props.onLogin(token);
          }
        } catch (err) {
          if (err.response !== undefined && err.response.status === 401) {
            // Unauthorized - password doesn't exists
            console.log("failed to connect - password doesn't exists");
            props.onError({
              title: "ההתחברות נכשלה",
              message: `סיסמא לא נכונה, אנא נסה סיסמא אחרת.
                    אם שכחת סיסמא- אנא לחץ על שכחתי סיסמא.`,
            });
            return;
          }
        }
      }
    } catch (err) {
      if (err.response !== undefined && err.response.status === 404) {
        console.log("failed to connect - user mail doesn't exists");
        props.onError({
          title: "ההתחברות נכשלה",
          message: "מייל זה לא קיים, אנא נסה מייל אחר.",
        });
        return;
      }
    }
    setEnteredMail("");
    setEnteredPass("");
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
              pattern="[a-z0-9]+@mta\.ac\.il"
              title="אנא הכנס/י מייל של המכללה האקדמדית תל אביב-יפו."
              style={{
                border: `2px solid ${mailBorderColor}`,
                backgroundColor: `${mailBackgroundColor}`,
              }}
              required
            />
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
        </div>

        <div className="login-actions">
          {/* TODO: onClick */}
          <Button className="login-btn btn" type="submit">
            התחברות
          </Button>

          {/* TODO: onClick */}
          <Button className="login-btn btn" onClick={props.onForgetPassword}>
            שכחתי סיסמא
          </Button>
          <Separator className="separator" />
          {/* TODO: onClick */}
          <Button className="register-btn btn" onClick={props.onRegister}>
            <p>
              אין לך משתמש ?
              <br />
              הירשם
            </p>
          </Button>
        </div>
      </Card>
    </form>
  );
};

export default LoginForm;
