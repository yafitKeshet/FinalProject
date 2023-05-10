import React from "react";
import Button from "../UI/Button";

const Menu = (props) => {
  return (
    <ul className="menu-list">
      {props.items.map((btn) => (
        <Button onClick={btn.onClick} key={Math.random().toString()}>
          {btn.data}
        </Button>
      ))}
    </ul>
  );
};

export default Menu;
