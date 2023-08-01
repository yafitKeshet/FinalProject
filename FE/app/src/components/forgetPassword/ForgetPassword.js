import React, { useState } from "react";
import Card from "../UI/Card";
import Button from "../UI/Button";
import Separator from "../UI/Separator";
import { ForgetPassStepTypes } from "../enums/enums.ts";
import "./ForgetPassword.css";
import axios from "axios";
import Cancel from "../UI/SVG/Cancel";
import { getUserProfile } from "../user/user.ts";

/*
  errors 
  STEP 1: insert mail - check if mail exist 
  STEP 2: insure mail - send code to mail 
  STEP 3: insert code from mail - check if same code 
  STEP 4: create new password & confirm pass - update data base - TODO yafit
  -> Move to Profile Page - TODO yafit
*/

const ForgetPassword = (props) => {
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
        return "איתור החשבון שלך";
      case ForgetPassStepTypes.step2:
        return `נשלח לך קוד לדוא"ל שלך`;
      case ForgetPassStepTypes.step3:
        return "הזן קוד אבטחה וסיסמא חדשה";
      // eslint-disable-next-line no-fallthrough
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
      case ForgetPassStepTypes.step2:
        return [
          {
            label: ` נוכל לשלוח קוד התחברות אל:`,
            key: "label2",
          },
          {
            label: inputs.mail,
            key: "label3",
          },
        ];
      case ForgetPassStepTypes.step3:
        return [
          { label: `שלחנו את הקוד שלך אל: ${inputs.mail}`, key: "label4" },

          {
            label: `יש לבדוק בדוא"ל אם קיבלת הודעה עם הקוד. `,
            key: "label5",
          },
          {
            label: `אורך הקוד הוא ‏6‏ ספרות.`,
            key: "label6",
          },
        ];

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

  // Submit handler
  const resetMail = () => {
    setInputs((prev) => {
      return { ...prev, mail: "" };
    });
  };

  const resetCode = () => {
    setInputs((prev) => {
      return { ...prev, code: "" };
    });
  };

  const submitHandler = async (event) => {
    console.log(`submit handler: ${currentStep} -> in forgot password`);
    event.preventDefault();
    switch (currentStep) {
      case ForgetPassStepTypes.step1:
        // check mail exists
        try {
          let checkMailRequest = await axios.get(
            "http://localhost:8080/userValidation?user_email=" + inputs.mail
          );
          if (
            checkMailRequest !== undefined &&
            checkMailRequest.status === 200
          ) {
            // user mail exists
            console.log("user mail exists -> in forgot password");
          }
        } catch (err) {
          if (err.response !== undefined && err.response.status === 404) {
            console.log("user mail doesn't exists -> in forgot password");
            props.onError({
              title: "אין תוצאות חיפוש",
              message: "החיפוש שלך לא החזיר תוצאות. נסה/נסי שוב עם מידע אחר.",
            });
            resetMail();
            return;
          }
        }
        break;
      case ForgetPassStepTypes.step2:
        // send code to mail
        try {
          let resetPasswordRequest = await axios.post(
            "http://localhost:8080/resetPassword1Step?user_email=" + inputs.mail
          );
          if (
            resetPasswordRequest !== undefined &&
            resetPasswordRequest.status === 200
          ) {
            console.log(resetPasswordRequest.data);
            if (resetPasswordRequest.data === true) {
              // mail sent properly
              console.log("user mail sent -> in forgot password");
            }
          }
        } catch (err) {
          if (err.response !== undefined && err.response.status === 404) {
            console.log(
              "mail is not sent, some problem happend -> in forgot password"
            );
            props.onError({
              title: "קוד אימות לא נשלח",
              message: "קוד האימות לא נשלח, אנא נסה/נסי שוב.",
            });
            return;
          }
        }
        break;
      case ForgetPassStepTypes.step3:
        // check if same code & save password
        try {
          let resetPasswordSecondRequest = await axios.post(
            "http://localhost:8080/resetPassword2Step",
            {
              user_email: inputs.mail,
              temp_password: inputs.code,
              new_password: inputs.password,
            }
          );
          if (
            resetPasswordSecondRequest !== undefined &&
            resetPasswordSecondRequest.status === 200
          ) {
            if (resetPasswordSecondRequest.data === true) {
              console.log("save new password -> in forgot password");

              // login the user
              try {
                let checkPasswordRequest = await axios.post(
                  "http://localhost:8080/login",
                  {
                    user_email: inputs.mail,
                    password: inputs.password,
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

                  let user = await getUserProfile(token);
                  props.onLogin(
                    props.onLogin({
                      token: user.token,
                      user_name: user.private_name + " " + user.last_name,
                      user_image: user.user_image,
                      user_email: user.email,
                    })
                  );
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
          }
        } catch (err) {
          if (err.response !== undefined && err.response.status === 400) {
            console.log("entered code was wrong -> in forgot password");
            props.onError({
              title: "קוד שגוי",
              message: "המספר שהזנת לא תואם לקוד שלך. נסה/נסי שוב.",
            });
            resetCode();
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
