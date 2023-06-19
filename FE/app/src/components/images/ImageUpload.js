import React, { useState } from "react";
import "./ImageUpload.css";

function ImageUpload(props) {
  const [image, setImage] = useState("");

  const covertToBase64 = (e) => {
    let newPath = e.target.value.replace("C:\\fakepath\\", "./users/");
    console.log(newPath);
    props.onUserImageChange(newPath);
    setImage(newPath);
    // var reader = new FileReader();
    // reader.readAsDataURL(e.target.files[0]);
    // reader.onload = () => {
    //   console.log(reader.result); // base64encoded string
    //   props.onUserImageChange(reader.result);
    //   setImage(reader.result);
    // };
    // reader.onerror = (error) => {
    //   console.log("Error: ", error);
    // };
  };
  return (
    <div>
      {image === "" || image === null ? (
        <div className="auth-inner" style={{ width: "auto" }}>
          <label className="imageUpload-content">{props.content}</label>
          <input
            className="imageUpload-content"
            accept="image/*"
            type="file"
            onChange={covertToBase64}
          />
        </div>
      ) : (
        <div className="auth-wrapper">
          <img width={100} height={100} src={image} alt="תמונה שהמשתמש העלה" />

          <div className="auth-inner" style={{ width: "auto" }}>
            <label className="imageUpload-content">
              התמונה שנבחרה <br />
              באפשרותך להעלות אחרת
            </label>
            <input
              className="imageUpload-content"
              accept="image/*"
              type="file"
              onChange={covertToBase64}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default ImageUpload;
