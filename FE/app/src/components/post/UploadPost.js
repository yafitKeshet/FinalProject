import React, { useState } from "react";
import "./UploadPost.css";
import Card from "../UI/Card";
import Button from "../UI/Button";
import { getUserFromJWT } from "../../generalFunctions.ts";
import Separator from "../UI/Separator";
import Cancel from "../UI/SVG/Cancel";
import axios from "axios";

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

  const submitHandler = async (event) => {
    event.preventDefault();
    const config = {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    };

    try {
      let uploadPostRequest = await axios.post(
        "http://localhost:8080/feed/new",
        {
          content: inputs.content,
          title: inputs.title,
          faculty: userData.faculty,
        },
        config
      );

      if (uploadPostRequest !== undefined && uploadPostRequest.status === 200) {
        console.log(`post upload`);
        toggleIsOpen();
        setInputs({ title: "", content: "" });
        props.onSubmit();
      }
    } catch (err) {
      console.log("upload post request failed");
      alert("משהו השתבש אנא נסה/נסי שוב");
    }
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
        className="uploadPost-content"
        type="text"
        value={inputs.content}
        onChange={contentChange}
        placeholder={`מה בא לך לשתף ${userData.private_name}?`}
        onClick={toggleIsOpen}
      />
      <form onSubmit={submitHandler}>
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
          value={inputs.content}
          onChange={contentChange}
          placeholder={`מה בא לך לשתף ${userData.private_name}?`}
          onClick={!isOpen ? toggleIsOpen : () => {}}
          required
        />
        <footer className="uploadPost-footer">
          <Separator className="separator" />
          <Button className="uploadPost-submit" type="submit">
            פרסם
          </Button>
        </footer>
      </form>
    </Card>
  );
};
export default UploadPost;
