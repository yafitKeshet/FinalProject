import React, { useState } from "react";
import Card from "../UI/Card";
import Button from "../UI/Button";
import Separator from "../UI/Separator";
import { StepTypes } from "../enums.ts";
import "./ForgetPassword.css";
import axios from "axios";

const ForgetPassword = (props) => {
  /*
    errors //TODO
    STEP 1: insert mail - check if mail exist 
    STEP 2: insure mail - send code to mail 
    STEP 3: insert code from mail - check if same code 
    STEP 4: create new password & confirm pass - update data base //TODO -mor (not yet)
    -> Move to Profile Page //TODO
  */

  // STEPS
  const [currentStep, setStep] = useState(StepTypes.step1);

  const setBackStep = () => {
    switch (currentStep) {
      case StepTypes.step2:
        setStep(StepTypes.step1);
        break;
      case StepTypes.step3:
        setStep(StepTypes.step2);
        break;
      // eslint-disable-next-line no-fallthrough
      default:
        props.onCancel();
    }
  };

  const setNextStep = () => {
    switch (currentStep) {
      case StepTypes.step1:
        setStep(StepTypes.step2);
        break;
      case StepTypes.step2:
        setStep(StepTypes.step3);
        break;
      case StepTypes.step3:
        setStep(StepTypes.step4);
        break;
      // eslint-disable-next-line no-fallthrough
      default:
        props.onCancel();
    }
  };

  // HEADERS
  const getHeader = () => {
    switch (currentStep) {
      case StepTypes.step1:
        return "איתור החשבון שלך";
      case StepTypes.step2:
        return `נשלח לך קוד לדוא"ל שלך`;
      case StepTypes.step3:
        return "הזן קוד אבטחה";
      case StepTypes.step4:
        return "הזן סיסמא חדשה";
      // eslint-disable-next-line no-fallthrough
      default:
        props.onCancel();
    }
  };

  // LABELS
  const getLabel = () => {
    switch (currentStep) {
      case StepTypes.step1:
        return [
          {
            label: ` יש להזין את כתובת הדוא"ל או מספר הטלפון כדי לחפש את החשבון שלך.`,
            key: "label1",
          },
        ];
      case StepTypes.step2:
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
      case StepTypes.step3:
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
      case StepTypes.step4:
        return [
          {
            label: "הכנס/י סיסמא חדשה.",
            key: "label7",
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
  const resetFields = () => {
    setInputs({ mail: "", code: "", password: "", confirmPassword: "" });
  };
  const submitHandler = async (event) => {
    console.log(`submit handler: ${currentStep} -> in forgot password`);
    event.preventDefault();
    switch (currentStep) {
      case StepTypes.step1:
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
            resetFields();
            return;
          }
        }
        break;
      case StepTypes.step2:
        // send code to mail
        try {
          let resetPasswordRequest = await axios.post(
            "http://localhost:8080//resetPassword1Step"
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
            resetFields();
            return;
          }
        }
        break;
      case StepTypes.step3:
        // check if same code
        try {
          let resetPasswordSecondRequest = await axios.get(
            "http://localhost:8080//resetPassword2Step",
            {
              temp_password: inputs.code,
              new_password: inputs.code,
            }
          );
          if (
            resetPasswordSecondRequest !== undefined &&
            resetPasswordSecondRequest.status === 200
          ) {
            console.log(resetPasswordSecondRequest.data);
            if (resetPasswordSecondRequest.data === true) {
              console.log("same code -> in forgot password");
            }
          }
        } catch (err) {
          if (err.response !== undefined && err.response.status === 404) {
            console.log("entered code was wrong -> in forgot password");
            props.onError({
              title: "קוד שגוי",
              message: "המספר שהזנת לא תואם לקוד שלך. נסה/נסי שוב.",
            });
            resetFields();
            return;
          }
        }

        break;
      case StepTypes.step4:
        // send new password to the server - MOR
        // move to feed/ profile - YAFIT
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

          {currentStep === StepTypes.step1 && (
            <input
              type="text"
              onChange={onMailChange}
              value={inputs.mail}
              className="forget-content"
              placeholder="some@mta.ac.il"
              pattern="[a-zA-Z0-9]+@mta\.ac\.il"
              title="The email should be of the Academic Tel-Aviv Yafo."
              required
            />
          )}

          {currentStep === StepTypes.step3 && (
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
          )}

          {currentStep === StepTypes.step4 && (
            <>
              <input
                onChange={onPassChange}
                value={inputs.password}
                className="forget-content"
                type="password"
                required
              />
              <label className="forget-content" key={"label8"}>
                "אנא חזור/חזרי על הסיסמא."
              </label>
              <input
                onChange={onConfirmPassChange}
                value={inputs.confirmPassword}
                pattern={inputs.password.toString()}
                title="Password not match."
                className="forget-content"
                type="password"
                required
              />
            </>
          )}
        </div>
        <Separator />

        <footer className="forget-actions">
          {(currentStep === StepTypes.step2 ||
            currentStep === StepTypes.step3) && (
            <Button className="forget-back" onClick={setBackStep}>
              {(currentStep === StepTypes.step2 && "זה לא המייל שלי") ||
                (currentStep === StepTypes.step3 && "לא קבלתי קוד")}
            </Button>
          )}
          <Button className="forget-cancel" onClick={props.onCancel}>
            ביטול
          </Button>
          <Button className="forget-send" type="submit">
            {(currentStep === StepTypes.step1 && "חיפוש") ||
              ((currentStep === StepTypes.step2 ||
                currentStep === StepTypes.step4 ||
                currentStep === StepTypes.step3) &&
                "המשך")}
          </Button>
        </footer>
      </Card>
    </form>
  );
};

export default ForgetPassword;
