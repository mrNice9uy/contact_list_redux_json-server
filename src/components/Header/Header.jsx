import { Button } from "antd";
import React from "react";
import classes from "./Header.module.scss";

const Header = (props) => {
  const { btnText, setBtnText } = props;
  const toggle = () => {
    setBtnText(!btnText);
  };
  return (
    <div className={classes.header}>
      <h2>{props.title}</h2>
      <Button className={classes.btn} type="primary" onClick={toggle}>
        {btnText ? "Log Out" : "Sign In"}
      </Button>
    </div>
  );
};

export default Header;
