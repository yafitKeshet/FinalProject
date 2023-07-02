import React, { useState } from "react";
import "./UploadJob.css";
import Card from "../UI/Card";
import Button from "../UI/Button";
import Separator from "../UI/Separator";
import Cancel from "../UI/SVG/Cancel";
import axios from "axios";
import { getConfig } from "../user/user.ts";

const UploadJob = (props) => {
  const [inputs, setInputs] = useState({
    title: "",
    description: "",
    time_required: "",
    company_name: "",
    logo: "",
    number_of_employees: "",
    experience: "",
  });
  const [isOpen, setIsOpen] = useState(false);

  const toggleIsOpen = () => {
    setIsOpen((prev) => {
      return !prev;
    });
  };

  const onCancel = () => {
    toggleIsOpen();
  };
  const titleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, title: e.target.value };
    });
  };
  const descriptionChange = (e) => {
    setInputs((prev) => {
      return { ...prev, title: e.target.value };
    });
  };
  const time_requiredChange = (e) => {
    setInputs((prev) => {
      return { ...prev, title: e.target.value };
    });
  };
  const company_nameChange = (e) => {
    setInputs((prev) => {
      return { ...prev, title: e.target.value };
    });
  };
  const logoChange = (e) => {
    setInputs((prev) => {
      return { ...prev, title: e.target.value };
    });
  };
  const number_of_employeesChange = (e) => {
    setInputs((prev) => {
      return { ...prev, title: e.target.value };
    });
  };
  const experienceChange = (e) => {
    setInputs((prev) => {
      return { ...prev, title: e.target.value };
    });
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    // const config = getConfig(props.user.token);

    // try {
    //   let uploadPostRequest = await axios.post(
    //     "http://localhost:8080/feed/new",
    //     {
    //       content: inputs.content,
    //       title: inputs.title,
    //       faculty: props.user.faculty,
    //     },
    //     config
    //   );

    //   if (uploadPostRequest !== undefined && uploadPostRequest.status === 200) {
    //     console.log(`post upload`);
    //     toggleIsOpen();
    //     setInputs({ title: "", content: "" });
    //     props.onSubmit();
    //   }
    // } catch (err) {
    //   console.log("upload post request failed");
    //   alert("משהו השתבש אנא נסה/נסי שוב");
    // }
    toggleIsOpen();
    setInputs({
      title: "",
      description: "",
      time_required: "",
      company_name: "",
      logo: "",
      number_of_employees: "",
      experience: "",
    });
  };

  return (
    <Card className={`uploadJob-card ${isOpen ? "open" : "close"}`}>
      {/* <Cancel className={`uploadJob-cancel`} onClick={onCancel} /> */}
      {/* <header className="uploadJob-header">
        <h2>פרסום משרה</h2>
        <Separator className="separator" />
      </header> */}
      <div className="uploadJob-author">
        <img
          src={props.user.user_image}
          alt="תמונה של המשתמש"
          onClick={props.moveToProfile}
        />
        {/* <h4>{props.user.private_name + " " + props.user.last_name}</h4> */}
      </div>
      {/* <Separator className="separator" /> */}
      <input
        className="uploadPost-content"
        type="text"
        value={inputs.description}
        onChange={descriptionChange}
        placeholder="פרסם משרה"
        onClick={toggleIsOpen}
      />
      {/* <form onSubmit={submitHandler}>
        <input
          className="uploadPost-title"
          type="text"
          value={inputs.title}
          onChange={titleChange}
          placeholder="הכנס/י כותרת לפוסט"
          required
        />
        <textarea
          className="uploadPost-content-text"
          type="text"
          value={inputs.description}
          onChange={descriptionChange}
          placeholder={`מה בא לך לשתף ${props.user.private_name}?`}
          onClick={!isOpen ? toggleIsOpen : () => {}}
          required
        /> */}
      {/* <footer className="uploadPost-footer">
          <Separator className="separator" />
          <Button className="uploadPost-submit" type="submit">
            פרסם
          </Button>
        </footer> */}
      {/* </form> */}
    </Card>
  );
};
export default UploadJob;
