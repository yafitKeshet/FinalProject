import React, { useState } from "react";
import Card from "../UI/Card";
import Button from "../UI/Button";
import Separator from "../UI/Separator";
import { ForgetPassStepTypes } from "../enums/enums.ts";
import "./ForgetPassword.css";
import axios from "axios";
import Cancel from "../UI/SVG/Cancel";

/*
  errors 
  STEP 1: insert mail - check if mail exist 
  STEP 2: insure mail - send code to mail 
  STEP 3: insert code from mail - check if same code 
  STEP 4: create new password & confirm pass - update data base - TODO yafit
  -> Move to Profile Page - TODO yafit
*/

const UpdatePassword = (props) => {
  // STEPS
  const [currentStep, setStep] = useState(ForgetPassStepTypes.step1);

  const setBackStep = () => {
    switch (currentStep) {
      case ForgetPassStepTypes.step2:
        setStep(ForgetPassStepTypes.step1);
        break;
      case ForgetPassStepTypes.step3:
        setStep(ForgetPassStepTypes.step2);
        break;
      // eslint-disable-next-line no-fallthrough
      default:
        props.onCancel();
    }
  };

  const setNextStep = () => {
    switch (currentStep) {
      case ForgetPassStepTypes.step1:
        setStep(ForgetPassStepTypes.step2);
        break;
      case ForgetPassStepTypes.step2:
        setStep(ForgetPassStepTypes.step3);
        break;
      // eslint-disable-next-line no-fallthrough
      default:
        props.onCancel();
    }
  };

  // HEADERS
  const getHeader = () => {
    switch (currentStep) {
      case ForgetPassStepTypes.step1:
        return "נא להכניס את הסיסמא החדשה הרצויה";
      default:
        props.onCancel();
    }
  };

  // LABELS
  const getLabel = () => {
    switch (currentStep) {
      case ForgetPassStepTypes.step1:
        return [
          {
            label: ` יש להזין את כתובת הדוא"ל או מספר הטלפון כדי לחפש את החשבון שלך.`,
            key: "label1",
          },
        ];
      default:
        props.onCancel();
    }
  };

  // INPUTS
  const [inputs, setInputs] = useState({
    password: "",
    confirmPassword: "",
  });

  // Input change handlers
  const onPassChange = (event) => {
    setInputs((prevState) => {
      return { ...prevState, password: event.target.value };
    });
  };
  const onConfirmPassChange = (event) => {
    setInputs((prevState) => {
      return { ...prevState, confirmPassword: event.target.value };
    });
  };

  
  const submitHandler = async (event) => {
    console.log(`submit handler: ${currentStep} -> in update password`);
    event.preventDefault();
    switch (currentStep) {
      case ForgetPassStepTypes.step1:
        try {
            fetch(
              "http://localhost:8080/login/updatePassword?new_password=" + inputs.password,
              {
                method: "PATCH",
                headers: {
                  Authorization: "Bearer " + props.user.token,
                  "Content-Type": "application/json",
                },
              }).then((updatePasswordRequest) => {
              if (updatePasswordRequest !== undefined && updatePasswordRequest.status === 200) {
                console.log("updatePasswordRequest - succeed");
              }
              else 
              {
                // YAFIT TO DO - POPUP OF FAILED UPDATE
                console.log("updatePasswordRequest- failed");
              }
            });
          } catch (err) {
            console.log(err);
            console.log("password update request failed");
            props.onError({
                title: "עדכון הסיסמא נכשל",
                message: `עדכון הסיסמא נכשל - אנא נסה שנית`,
              });
              return;
          }
        break;
      // eslint-disable-next-line no-fallthrough
      default:
        props.onCancel();
    }

    setNextStep();
  };

  return (
    <form className="forget-form" onSubmit={submitHandler}>
      <div className="backdrop" onClick={props.onCancel} />
      <Card className="forget-card">
        <header className="forget-header">
          <Cancel className="forget-cancel-btn" onClick={props.onCancel} />
          <h2> {getHeader()}</h2>
        </header>
        <Separator />

        <div className="forget-contents">
          {getLabel().map((item) => {
            return (
              <label className="forget-content" key={item.key}>
                {item.label}
              </label>
            );
          })}

          {currentStep === ForgetPassStepTypes.step1 && (
            <input
              type="text"
              onChange={onMailChange}
              value={inputs.mail}
              className="forget-content"
              placeholder="some@mta.ac.il"
              pattern="[a-z0-9]+@mta\.ac\.il"
              title="אנא הכנס/י מייל של המכללה האקדמדית תל אביב-יפו."
              required
            />
          )}

          {currentStep === ForgetPassStepTypes.step3 && (
            <>
              <input
                onChange={onCodeChange}
                value={inputs.code}
                className="forget-content"
                type="text"
                placeholder="הזן/הזני את הקוד"
                pattern="[0-9]{6}"
                title="נא להכניס קוד בן 6 ספרות"
                required
              />

              <label className="forget-content" key={"label7"}>
                הכנס/י סיסמא חדשה.
              </label>
              <input
                onChange={onPassChange}
                value={inputs.password}
                className="forget-content"
                type="password"
                required
              />
              <label className="forget-content" key={"label8"}>
                אנא חזור/חזרי על הסיסמא.
              </label>
              <input
                onChange={onConfirmPassChange}
                value={inputs.confirmPassword}
                pattern={inputs.password.toString()}
                title="סיסמאות לא תואמות."
                className="forget-content"
                type="password"
                required
              />
            </>
          )}
        </div>
        <Separator />

        <footer className="forget-actions">
          {(currentStep === ForgetPassStepTypes.step2 ||
            currentStep === ForgetPassStepTypes.step3) && (
            <Button className="forget-back" onClick={setBackStep}>
              {(currentStep === ForgetPassStepTypes.step2 &&
                "זה לא המייל שלי") ||
                (currentStep === ForgetPassStepTypes.step3 && "לא קבלתי קוד")}
            </Button>
          )}
          {/* <Button className="forget-cancel" onClick={props.onCancel}>
            ביטול
          </Button> */}
          <Button className="forget-send" type="submit">
            {(currentStep === ForgetPassStepTypes.step1 && "חיפוש") ||
              ((currentStep === ForgetPassStepTypes.step2 ||
                currentStep === ForgetPassStepTypes.step3) &&
                "המשך")}
          </Button>
        </footer>
      </Card>
    </form>
  );
};

export default ForgetPassword;
