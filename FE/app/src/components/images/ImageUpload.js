import React, { useState } from "react";
import "./ImageUpload.css";
import Button from "../UI/Button";

function ImageUpload(props) {
  const [image, setImage] = useState("");
  const onRemoveImg = () => {
    props.onUserImageChange("");
    setImage("");
  };

  const covertToBase64 = (e) => {
    let newPath = e.target.value.replace("C:\\fakepath\\", "./users/");
    console.log(newPath);
    props.onUserImageChange(newPath);
    setImage(newPath);
  };
  return (
    <div>
      {image === "" || image === null ? (
        <div className="auth-inner" style={{ width: "auto" }}>
          <label>{props.content}</label>
          <input accept="image/*" type="file" onChange={covertToBase64} />
        </div>
      ) : (
        <div className="auth-wrapper">
          <img width={100} height={100} src={image} alt="תמונה שהמשתמש העלה" />

          <div className="auth-inner" style={{ width: "auto" }}>
            <label>
              התמונה שנבחרה <br />
              באפשרותך להעלות אחרת
            </label>
            <input accept="image/*" type="file" onChange={covertToBase64} />
          </div>
          <Button className="removeImg" onClick={onRemoveImg}>
            מחק תמונה
          </Button>
        </div>
      )}
    </div>
  );
}

export default ImageUpload;
