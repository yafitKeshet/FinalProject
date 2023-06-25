import React, { useState } from "react";
import Card from "../UI/Card";
import Button from "../UI/Button";
import Separator from "../UI/Separator";
import { RegisterStepTypes, Faculty, Year } from "../enums/enums.ts";
import axios from "axios";
import "./Register.css";
import Mark from "../UI/SVG/Mark";
import Cancel from "../UI/SVG/Cancel";
import ImageUpload from "../images/ImageUpload";

/*
    errors 
    step1 = "step1- insert mail (check if already exist & send confirm code)",
    step2 = "step2- insert code from mail",
    step3 = "step3- insert user data",
  */
const Register = (props) => {
  const [currentStep, setStep] = useState(RegisterStepTypes.step1);
  const [checked, setChecked] = useState(false);

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

  const onCheckBox = () => {
    if (checked) {
      setInputs((prevState) => {
        return {
          ...prevState,
          jobCompanyName: "",
          jobStartYear: "",
          jobDescription: "",
        };
      });
    }
    setChecked((prev) => {
      return !prev;
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
      return { ...prevState, userImage: event };
    });
  };

  // Submit handler
  const submitHandler = async (event) => {
    console.log("register: ", inputs);
    console.log(`submit handler: ${currentStep} -> in register password`);
    event.preventDefault();

    let checkMailRequest = null;
    switch (currentStep) {
      case RegisterStepTypes.step1:
        try {
          checkMailRequest = await axios.get(
            "http://localhost:8080/userValidation?user_email=" + inputs.mail
          );

          if (
            checkMailRequest !== undefined &&
            checkMailRequest.status === 200
          ) {
            console.log("failed to register - user mail  exists");
            props.onError({
              title: "הרשמה נכשלה",
              message: "מייל קיים, אנא נסה מייל אחר.",
            });
            return;
          }
        } catch (err) {
          if (err.response !== undefined && err.response.status === 404) {
            // user mail doesn't exists, need to send temp code
            console.log("user mail doesn't exists, sending code");
            try {
              let resetPasswordRequest = await axios.post(
                "http://localhost:8080/signUp/firstStep?user_email=" +
                  inputs.mail
              );
              if (
                resetPasswordRequest !== undefined &&
                resetPasswordRequest.status === 200
              ) {
                if (resetPasswordRequest.data === true) {
                  // mail sent properly
                  console.log("temp code was sent");
                }
              }
            } catch (err) {
              if (err.response !== undefined && err.response.status === 404) {
                console.log(
                  "mail is not sent, some problem happend -> in register"
                );
                props.onError({
                  title: "קוד אימות לא נשלח",
                  message: "קוד האימות לא נשלח, אנא נסה/נסי שוב.",
                });
                return;
              }
            }
          }
        }
        break;
      case RegisterStepTypes.step2:
        try {
          let codeRequest = await axios.post(
            "http://localhost:8080/signUp/secondStep",
            {
              user_email: inputs.mail,
              temp_password: inputs.code,
            }
          );
          if (codeRequest !== undefined && codeRequest.status === 200) {
            if (codeRequest.data === true) {
              // temp code OK
              console.log("temp code OK");
            }
          }
        } catch (err) {
          console.log(inputs.code, inputs.mail);
          if (err.response !== undefined && err.response.status === 400) {
            console.log("temp code not the same");
            props.onError({
              title: "קוד לא זהה",
              message: "קוד האימות לא נכון, אנא נסה/נסי שוב.",
            });
            return;
          }
        }
        break;

      case RegisterStepTypes.step3:
        try {
          let date = inputs.birthdayDate.split("-");
          let new_date = date[2] + "/" + date[1] + "/" + date[0];
          let finalImg =
            inputs.userImage === "" ? "./anonymousImg.png" : inputs.userImage;
          let jobStartYear =
            inputs.jobStartYear !== "" ? inputs.jobStartYear : 0;
          let registerRequest = await axios.post(
            "http://localhost:8080/signUp",
            {
              user_email: inputs.mail,
              password: inputs.password,
              private_name: inputs.firstName,
              last_name: inputs.lastName,
              birthday_date: new_date,
              faculty: inputs.faculty,
              year: inputs.year,
              job_company_name: inputs.jobCompanyName,
              job_start_year: jobStartYear,
              job_description: inputs.jobDescription,
              user_image: finalImg,
            }
          );
          if (registerRequest !== undefined && registerRequest.status === 200) {
            // good to go (mail and password are correct)
            console.log("register succeed");
            let token = registerRequest.data.jwt_token; // user token
            token = token.replace(/(?:\r\n|\r|\n)/g, "");
            props.onLogin(token);
          }
        } catch (err) {
          console.log(err);
          if (err.response !== undefined && err.response.status === 409) {
            // Unauthorized - password doesn't exists
            console.log("failed to signup- user already exist.");
            props.onError({
              title: "ההרשמה נכשלה",
              message: "משתמש זה כבר קיים.",
            });
            return;
          }
        }
        break;
      // eslint-disable-next-line no-fallthrough
      default:
        props.onCancel();
    }
    setNextStep();
  };

  const currentDate = new Date();

  return (
    <form className="register-form" onSubmit={submitHandler}>
      <div className="backdrop" onClick={props.onCancel} />
      <Card className="register-card">
        <header className="register-header">
          <Cancel className="register-cancel-btn" onClick={props.onCancel} />
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
                pattern="[a-z0-9]+@mta\.ac\.il"
                title="אנא הכנס/י מייל של המכללה האקדמדית תל אביב-יפו."
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

                <div className="input-div">
                  <Mark className="sticky" />
                  <select
                    className="register-content"
                    onChange={onFacultyChange}
                    value={inputs.faculty}
                    required
                  >
                    <option value="">אנא בחרי/י פקולטה</option>

                    {Object.keys(Faculty).map((faculty) => {
                      switch (faculty) {
                        case Faculty.ComputerScience:
                          return (
                            <option
                              value={faculty}
                              key={Math.random().toString()}
                            >
                              מדעי המחשב
                            </option>
                          );
                        case Faculty.Economy:
                          return (
                            <option
                              value={faculty}
                              key={Math.random().toString()}
                            >
                              כלכלה
                            </option>
                          );
                        case Faculty.Psychology:
                          return (
                            <option
                              value={faculty}
                              key={Math.random().toString()}
                            >
                              פסיכולוגיה
                            </option>
                          );
                        case Faculty.Social:
                          return (
                            <option
                              value={faculty}
                              key={Math.random().toString()}
                            >
                              סוציולוגיה
                            </option>
                          );
                        default:
                          return {};
                      }
                    })}
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
                    {Object.keys(Year).map((year) => {
                      switch (year) {
                        case Year.First:
                          return (
                            <option value={year} key={Math.random().toString()}>
                              שנה ראשונה
                            </option>
                          );
                        case Year.Second:
                          return (
                            <option value={year} key={Math.random().toString()}>
                              שנה שנייה
                            </option>
                          );
                        case Year.Third:
                          return (
                            <option value={year} key={Math.random().toString()}>
                              שנה שלישית
                            </option>
                          );
                        case Year.Fourth:
                          return (
                            <option value={year} key={Math.random().toString()}>
                              שנה רביעית
                            </option>
                          );
                        case Year.Fifth:
                          return (
                            <option value={year} key={Math.random().toString()}>
                              שנה חמישית
                            </option>
                          );
                        case Year.Graduated:
                          return (
                            <option value={year} key={Math.random().toString()}>
                              סיימתי את הלימודים
                            </option>
                          );

                        default:
                          return {};
                      }
                    })}
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
              <div className="checkBox-div">
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={onCheckBox}
                />
                <label>אני עובד/ת</label>
              </div>
              <Separator />
              <div className="register-details">
                {checked && (
                  <div className="input-div">
                    <Mark className="sticky" />
                    <input
                      onChange={onJobCompanyNameChange}
                      value={inputs.jobCompanyName}
                      placeholder="שם מקום עבודה"
                      className="register-content"
                      type="text"
                      required
                    />
                  </div>
                )}
                {checked && (
                  <div className="input-div">
                    <Mark className="sticky" />
                    <input
                      onChange={onJobStartYearChange}
                      value={inputs.jobStartYear}
                      placeholder="שנת התחלת עבודה"
                      className="register-content"
                      type="number"
                      max={currentDate.getFullYear()}
                      min="1900"
                      required
                    />
                  </div>
                )}
                {checked && (
                  <div className="input-div">
                    <Mark className="sticky" />
                    <textarea
                      onChange={onJobDescriptionChange}
                      value={inputs.jobDescription}
                      placeholder="תיאור של מקום העבודה"
                      className="register-content  register-description"
                      type="text"
                      required
                    />
                  </div>
                )}
                <div>
                  <ImageUpload
                    content="אנא בחר/י תמונה"
                    onUserImageChange={onUserImageChange}
                  />
                </div>
              </div>
            </>
          )}
        </div>
        <Separator />
        <footer className="register-actions">
          {currentStep === RegisterStepTypes.step2 && (
            <Button className="register-back" onClick={setBackStep}>
              לא קבלתי קוד
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
