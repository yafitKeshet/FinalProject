import React from "react";
import Button from "../UI/Button";
import "./Menu.css";

const Menu = (props) => {
  return (
    <ul className="menu-list">
      {props.items.map((btn) => (
        <Button
          className="menu-item"
          onClick={btn.onclick}
          key={Math.random().toString()}
        >
          {btn.data}
        </Button>
      ))}
    </ul>
  );
};

export default Menu;
