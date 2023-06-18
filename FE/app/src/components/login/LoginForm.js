import "./LoginForm.css";
import React, { useState, useEffect } from "react";
import Button from "../UI/Button";
import Card from "../UI/Card";
import Separator from "../UI/Separator";
import axios from "axios";

const userData = {
  mail: "",
  pass: "",
  name: "",
  token: ""
};

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
  const [userName, setUserName] = useState("");
  const [userToken, setUserToken] = useState("");
  const [enteredConfirmPass, setEnteredConfirmPass] = useState("");

  
  useEffect(() => {
    // console.log("userName1: " + userName);
    userData.name = userName;
  }, [userName]);
  
  useEffect(() => {
    // console.log("userToken1: " + userToken);
    userData.token = userToken;
  }, [userToken]);

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

  const confirmPassChangeHandler = (event) => {
    let isValid =
      event.target.value.length > 0 && event.target.value === enteredPass;
    setEnteredConfirmPass(event.target.value);
    setConfirmPassBorderColor(isValid ? "green" : "red");
    setConfirmPassBackgroundColor(isValid ? "rgb(117, 250, 113)" : "#f86262");
  };

  // Get User Profile handler
  const getUserProfile = async (token) => {
     // MOR TODO: after using token as local storage: change the way you treat it here:
            
            const config = {
              headers: {
                Authorization: 'Bearer ' + token,
              },
            };
            // console.log("userToken: " + userToken);
            try {
              let userDataRequest = await axios.get('http://localhost:8080/profile', config);
              if (userDataRequest !== undefined && userDataRequest.status === 200) {
                // we got user profile data
                let username = userDataRequest.data.private_name.charAt(0).toUpperCase() + userDataRequest.data.private_name.slice(1);
                // console.log("we got user profile data , userName: " + username);
                // setUserName(username);
                userData.name = username;
              }
            } catch (err) {
              if (err.response !== undefined && err.response.status === 401) {
                // Unable to get user profile data
                console.log("failed to get user profile data");
                return;
              }
            }
  };


  // Login handler
  const submitHandler = async (event) => {
    event.preventDefault();

    // DONE ↓
    // 1. Check if mail existing- userValidation.
    // & DONE ↓
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
          let checkPasswordRequest = await axios.post("http://localhost:8080/login", {
            user_email: enteredMail,
            password: enteredPass,
          });

          if (checkPasswordRequest !== undefined && checkPasswordRequest.status === 200) {
            // good to go (mail and password are correct)
            console.log("good to go (mail and password are correct)");
            let token = checkPasswordRequest.data.jwt_token; // user token
            // YAFIT TODO: move user to the main page
            token = token.replace(/(?:\r\n|\r|\n)/g, '');
            setUserToken(token);
            console.log(token);
            // Save current page
            sessionStorage.setItem("token", token);

            console.log( `token saved: ${sessionStorage.getItem("token")}`);
            await getUserProfile(token);
            
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

    
    userData.mail = enteredMail;
    userData.pass = enteredPass;
    // // TODO
    // // 3. Get user data.
    // const userData = {
    //   mail: enteredMail,
    //   pass: enteredPass,
    //   name: userName,
    //   token: userToken
    // };

    setEnteredMail("");
    setEnteredPass("");
    setEnteredConfirmPass("");

    // TODO
    props.onLogin(userData);

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
          {/* <div className="login-control">
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
          </div> */}
        </div>

        <div className="login-actions">
          {/* TODO: onClick */}
          <Button className="login-btn btn" type="submit">
            התחברות
          </Button>

          {/* TODO: onClick */}
          <Button
            className="login-btn btn"
            onClick={props.onForgetPassword}
          >
            שכחתי סיסמא
          </Button>
          <Separator className="separator" />
          {/* TODO: onClick */}
          <Button className="register-btn btn">
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
