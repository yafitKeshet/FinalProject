import React, { useState } from "react";
import Card from "../UI/Card";
import Button from "../UI/Button";
import Separator from "../UI/Separator";
import { RegisterStepTypes } from "../enums.ts";
import axios from "axios";
import "./Register.css";
import Mark from "../UI/SVG/Mark";
import Cancel from "../UI/SVG/Cancel";
/*
    errors 
    step1 = "step1- insert mail (check if already exist & send confirm code)",
    step2 = "step2- insert code from mail",
    step3 = "step3- insert user data",
  */
const Register = (props) => {
  const [currentStep, setStep] = useState(RegisterStepTypes.step1);

  const setBackStep = () => {
    switch (currentStep) {
      case RegisterStepTypes.step2:
        setStep(RegisterStepTypes.step1);
        break;
      case RegisterStepTypes.step3:
        setStep(RegisterStepTypes.step2);
        break;

      // eslint-disable-next-line no-fallthrough
      default:
        props.onCancel();
    }
  };

  const setNextStep = () => {
    switch (currentStep) {
      case RegisterStepTypes.step1:
        setStep(RegisterStepTypes.step2);
        break;
      case RegisterStepTypes.step2:
        setStep(RegisterStepTypes.step3);
        break;
      // eslint-disable-next-line no-fallthrough
      default:
        props.onCancel();
    }
  };

  // HEADERS
  const getHeader = () => {
    switch (currentStep) {
      case RegisterStepTypes.step1:
        return "הרשמה";
      case RegisterStepTypes.step2:
        return "הזן קוד אבטחה";
      case RegisterStepTypes.step3:
        return "מלא/י פרטים";
      // eslint-disable-next-line no-fallthrough
      default:
        props.onCancel();
    }
  };

  // INPUTS
  const [inputs, setInputs] = useState({
    mail: "",
    code: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    birthdayDate: "",
    faculty: "",
    year: "",
    jobCompanyName: "",
    jobStartYear: "",
    jobDescription: "",
    userImage: "",
  });

  // Input change handlers
  const onMailChange = (event) => {
    setInputs((prevState) => {
      return { ...prevState, mail: event.target.value };
    });
  };
  const onCodeChange = (event) => {
    setInputs((prevState) => {
      return { ...prevState, code: event.target.value };
    });
  };

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
  const onFirstNameChange = (event) => {
    setInputs((prevState) => {
      return { ...prevState, firstName: event.target.value };
    });
  };

  const onLastNameChange = (event) => {
    setInputs((prevState) => {
      return { ...prevState, lastName: event.target.value };
    });
  };
  const onBirthdayDateChange = (event) => {
    setInputs((prevState) => {
      return { ...prevState, birthdayDate: event.target.value };
    });
  };
  const onFacultyChange = (event) => {
    setInputs((prevState) => {
      return { ...prevState, faculty: event.target.value };
    });
  };

  const onYearChange = (event) => {
    setInputs((prevState) => {
      return { ...prevState, year: event.target.value };
    });
  };
  const onJobCompanyNameChange = (event) => {
    setInputs((prevState) => {
      return { ...prevState, jobCompanyName: event.target.value };
    });
  };

  const onJobStartYearChange = (event) => {
    setInputs((prevState) => {
      return { ...prevState, jobStartYear: event.target.value };
    });
  };
  const onJobDescriptionChange = (event) => {
    setInputs((prevState) => {
      return { ...prevState, jobDescription: event.target.value };
    });
  };
  const onUserImageChange = (event) => {
    setInputs((prevState) => {
      return { ...prevState, userImage: event.target.value };
    });
  };

  // Submit handler
  const submitHandler = (event) => {
    console.log(`submit handler: ${currentStep} -> in register password`);
    event.preventDefault();
    switch (currentStep) {
      case RegisterStepTypes.step1:
        break;
      case RegisterStepTypes.step2:
        break;
      case RegisterStepTypes.step3:
        // props.onLogin();
        props.onLogin();
        break;
      // eslint-disable-next-line no-fallthrough
      default:
        props.onCancel();
    }
    setNextStep();
  };

  const currentDate = new Date();
  //year= year.getFullYear();

  return (
    <form className="register-form" onSubmit={submitHandler}>
      <div className="backdrop" onClick={props.onCancel} />
      <Card className="register-card">
        <Cancel className="register-cancel-btn" onClick={props.onCancel} />
        <header className="register-header">
          <h2>{getHeader()}</h2>
        </header>
        <Separator />
        <div className="register-contents">
          {currentStep === RegisterStepTypes.step1 && (
            <>
              <label className="register-content">
                הזן/ הזני כתובת דוא"ל ונשלח לך קוד אימות.
              </label>
              <input
                type="text"
                onChange={onMailChange}
                value={inputs.mail}
                className="register-content"
                placeholder="some@mta.ac.il"
                pattern="[a-zA-Z0-9]+@mta\.ac\.il"
                title="The email should be of the Academic Tel-Aviv Yafo."
                required
              />
            </>
          )}
          {currentStep === RegisterStepTypes.step2 && (
            <>
              <label className="register-content">
                שלחנו את הקוד שלך אל: {inputs.mail}
              </label>
              <label className="register-content">
                אורך הקוד הוא בן 6 ספרות.
              </label>

              <input
                onChange={onCodeChange}
                value={inputs.code}
                className="register-content"
                type="text"
                placeholder="הזן/הזני את הקוד"
                pattern="[0-9]{6}"
                title="נא להכניס קוד בן 6 ספרות"
                required
              />
            </>
          )}
          {currentStep === RegisterStepTypes.step3 && (
            <>
              <div className="register-details">
                <div className="input-div">
                  <Mark className="sticky" />
                  <input
                    onChange={onFirstNameChange}
                    value={inputs.firstName}
                    placeholder="שם פרטי"
                    className="register-content"
                    type="text"
                    required
                  />
                </div>
                <div className="input-div">
                  <Mark className="sticky" />
                  <input
                    onChange={onLastNameChange}
                    value={inputs.lastName}
                    placeholder="שם משפחה"
                    className="register-content"
                    type="text"
                    required
                  />
                </div>
                <div className="input-div">
                  <Mark className="sticky" />
                  <input
                    onChange={onBirthdayDateChange}
                    value={inputs.birthdayDate}
                    className="register-content"
                    type="date"
                    required
                  />
                </div>
                {/* TODO - enum */}

                <div className="input-div">
                  <Mark className="sticky" />
                  <select
                    className="register-content"
                    onChange={onFacultyChange}
                    value={inputs.faculty}
                    required
                  >
                    <option value="">אנא בחרי/י פקולטה</option>
                    <option value="1">מדעי המחשב</option>
                    <option value="2">מערכות הפעלה</option>
                    <option value="3">פסיכולוגיה</option>
                    <option value="4">סיעוד</option>
                  </select>
                </div>

                <div className="input-div">
                  <Mark className="sticky" />
                  <select
                    className="register-content"
                    onChange={onYearChange}
                    value={inputs.year}
                    required
                  >
                    <option value="">בחר/י שנת לימודים</option>
                    <option value="1">שנה 1</option>
                    <option value="2">שנה 2</option>
                    <option value="3">שנה 3</option>
                    <option value="4">שנה 4</option>
                    <option value="5">סיימתי את הלימודים</option>
                  </select>
                </div>
              </div>
              <Separator />
              <div className="input-div">
                <Mark className="sticky" />
                <input
                  onChange={onPassChange}
                  placeholder="סיסמא"
                  value={inputs.password}
                  className="register-content"
                  type="password"
                  required
                />
              </div>

              <div className="input-div">
                <Mark className="sticky" />
                <input
                  onChange={onConfirmPassChange}
                  value={inputs.confirmPassword}
                  placeholder="חזור/חזרי על הסיסמא"
                  pattern={inputs.password.toString()}
                  title="סיסמאות לא תואמות."
                  className="register-content"
                  type="password"
                  required
                />
              </div>
              <Separator />
              <div className="register-details">
                <input
                  onChange={onJobCompanyNameChange}
                  value={inputs.jobCompanyName}
                  placeholder="שם מקום עבודה"
                  className="register-content"
                  type="text"
                />
                <input
                  onChange={onJobStartYearChange}
                  value={inputs.jobStartYear}
                  placeholder="שנת התחלת עבודה"
                  className="register-content"
                  type="number"
                  max={currentDate.getFullYear()}
                  min="1900"
                />
                <input
                  onChange={onJobDescriptionChange}
                  value={inputs.jobDescription}
                  placeholder="תיאור של מקום העבודה"
                  className="register-content"
                  type="text"
                />
                <div>
                  <label className="register-content">העלה/העלי תמונה</label>
                  <input
                    onChange={onUserImageChange}
                    type="file"
                    value={inputs.userImage}
                    id="img"
                    className="register-content"
                    name="img"
                    accept="image/*"
                  />
                </div>
              </div>
            </>
          )}
        </div>
        <Separator />
        <footer className="register-actions">
          {currentStep !== RegisterStepTypes.step1 && (
            <Button className="register-back" onClick={setBackStep}>
              חזרה
            </Button>
          )}
          <Button className="register-send" type="submit">
            המשך
          </Button>
        </footer>
      </Card>
    </form>
  );
};

export default Register;
