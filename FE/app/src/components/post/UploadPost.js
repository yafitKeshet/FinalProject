import React, { useState } from "react";
import "./UploadPost.css";
import Card from "../UI/Card";
import Button from "../UI/Button";
import { getUserFromJWT } from "../../generalFunctions.ts";
import Separator from "../UI/Separator";
import Cancel from "../UI/SVG/Cancel";

const UploadPost = (props) => {
  const userData = getUserFromJWT(sessionStorage.getItem("token"));
  const [inputs, setInputs] = useState({ title: "", content: "" });
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

  const contentChange = (e) => {
    setInputs((prev) => {
      return { ...prev, content: e.target.value };
    });
  };

  const submitHandler = () => {
    console.log("post upload :)");
  };

  return (
    <Card className={`uploadPost-card ${isOpen ? "open" : "close"}`}>
      <Cancel className={`uploadPost-cancel`} onClick={onCancel} />
      <header className="uploadPost-header">
        <h2>יצירת פוסט</h2>
        <Separator className="separator" />
      </header>
      <div className="uploadPost-author">
        <img
          src={userData.user_image}
          alt="תמונה של המשתמש"
          onClick={props.moveToProfile}
        />
        <h4>{userData.private_name + " " + userData.last_name}</h4>
      </div>
      <Separator className="separator" />
      <input
        className="uploadPost-title"
        type="text"
        value={inputs.title}
        onChange={titleChange}
        placeholder="הכנס/י כותרת לפוסט"
      />
      <input
        className="uploadPost-content"
        type="text"
        value={inputs.content}
        onChange={contentChange}
        placeholder={`מה בא לך לשתף ${userData.private_name}?`}
        onClick={!isOpen ? toggleIsOpen : () => {}}
      />
      <textarea
        className="uploadPost-content-text"
        type="text"
        value={inputs.content}
        onChange={contentChange}
        placeholder={`מה בא לך לשתף ${userData.private_name}?`}
        onClick={!isOpen ? toggleIsOpen : () => {}}
      />
      <footer className="uploadPost-footer">
        <Separator />
        <Button className="uploadPost-submit" onClick={submitHandler}>
          פרסם
        </Button>
      </footer>
    </Card>
  );
};
export default UploadPost;
