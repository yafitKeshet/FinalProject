import React, { useState } from "react";
import Card from "../UI/Card";
import Button from "../UI/Button";
import Separator from "../UI/Separator";

import "./ForgetPassword.css";

const ForgetPassword = (props) => {
  /*
    errors //TODO
    STEP 1: insert mail - check if mail exist //TODO 
    STEP 2: insure mail - send code to mail //TODO
    STEP 3: insert code from mail - check if same code //TODO
    STEP 4: create new password & confirm pass - update data base //TODO
    -> Move to Profile Page //TODO

*/

  // STEPS
  const [currentStep, setStep] = useState("step1");

  const setBackStep = () => {
    switch (currentStep) {
      case "step2":
        setStep("step1");
        break;
      case "step3":
        setStep("step2");
      // eslint-disable-next-line no-fallthrough
      default:
        props.onCancel();
    }
  };

  const setNextStep = () => {
    switch (currentStep) {
      case "step1":
        setStep("step2");
        break;
      case "step2":
        setStep("step3");
        break;
      case "step3":
        setStep("step4");
      // eslint-disable-next-line no-fallthrough
      default:
        props.onCancel();
    }
  };

  // HEADERS
  const getHeader = () => {
    switch (currentStep) {
      case "step1":
        return "איתור החשבון שלך";
      case "step2":
        return `נשלח לך קוד לדוא"ל שלך`;
      case "step3":
        return "הזן קוד אבטחה";
      // eslint-disable-next-line no-fallthrough
      default:
        props.onCancel();
    }
  };

  // LABELS
  const getLabel = () => {
    switch (currentStep) {
      case "step1":
        return [
          {
            label: ` יש להזין את כתובת הדוא"ל או מספר הטלפון כדי לחפש את החשבון שלך.`,
            key: "label1",
          },
        ];
      case "step2":
        return [
          {
            label: ` נוכל לשלוח קוד התחברות אל:`,
            key: "label2",
          },
          {
            label: inputs.mailStep1,
            key: "label3",
          },
        ];

      case "step3":
        return [
          { label: `שלחנו את הקוד שלך אל: ${inputs.mailStep1}`, key: "label4" },

          {
            label: `יש לבדוק בדוא"ל אם קיבלת הודעה עם הקוד. אורך הקוד הוא ‏6‏ ספרות.`,
            key: "label5",
          },
        ];
      // eslint-disable-next-line no-fallthrough
      default:
        props.onCancel();
    }
  };

  // INPUTS
  const [inputs, setInputs] = useState({ mailStep1: "" });

  // Input change handlers
  const onMailChangeStep1 = (event) => {
    setInputs((prevState) => {
      return { ...prevState, mailStep1: event.target.value };
    });
  };

  // Submit handler
  const submitHandler = (event) => {
    event.preventDefault();
    switch (currentStep) {
      case "step1":
        // check mail exists
        //error msg
        break;
      case "step2":
        //send code to mail
        break;
      case "step3":

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

          {currentStep === "step1" && (
            <input
              onChange={onMailChangeStep1}
              value={inputs.mailStep1}
              className="forget-content"
              type="text"
              placeholder="some@mta.ac.il"
              pattern="[a-zA-Z0-9._%+-]+@mta.ac.il"
              title="The email should be of the Academic Tel-Aviv Yafo."
              required
            />
          )}
        </div>
        <Separator />

        <footer className="forget-actions">
          {currentStep === "step2" && (
            <Button className="forget-back" onClick={setBackStep}>
              זה לא המייל שלי
            </Button>
          )}
          <Button className="forget-cancel" onClick={props.onCancel}>
            ביטול
          </Button>
          <Button className="forget-send" type="submit">
            {(currentStep === "step1" && "חיפוש") ||
              (currentStep === "step2" && "המשך")}
          </Button>
        </footer>
      </Card>
    </form>
  );
};

export default ForgetPassword;
