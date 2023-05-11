import React from "react";
import Menu from "./Menu";
import "./Header.css";

const Header = (props) => {
  return (
    <div className="header">
      <Menu className="menu-header" items={props.menu}></Menu>
      <div className="logo-header">
        <img
          src="https://yt3.googleusercontent.com/ytc/AGIKgqM4YckxkigCs1Cjc9XDeyZp3e7Gn9I_AlhLusiteA=s900-c-k-c0x00ffffff-no-rj"
          alt="לוגו האקדמית תל אביב יפו"
        />
      </div>
    </div>
  );
};

export default Header;
