import React from "react";
import Menu from "./Menu";
import "./Header.css";

const Header = (props) => {
  return (
    <div className="header">
      <div className="menu-header">
        {props.isLoggedIn && (
          <div className="user-menu">
            <Menu
              items={[
                { onClick: props.onLogOut, data: "התנתק" },
                {
                  onclick: {},
                  data: `שלום ${localStorage.getItem("userName")}`,
                },
              ]}
            />{" "}
          </div>
        )}
        <div className={`${props.isLoggedIn && "buttons-menu"}`}>
          <Menu items={props.menu}></Menu>
        </div>
      </div>

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
