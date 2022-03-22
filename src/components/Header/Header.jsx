import { Button } from "antd";
import { isEmpty } from "lodash";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearUser } from "../../store/actions/user";
import classes from "./Header.module.scss";

const Header = (props) => {
  const { title, user } = props;
  const dispatch = useDispatch();
  const navigate= useNavigate();
  const toggle = () => {
    dispatch(clearUser());
    navigate('/');
  };
  return (
    <div className={classes.header}>
      <h2>{title}</h2>
      <Button disabled={isEmpty(user)} className={classes.btn} type="primary" onClick={toggle}>
        Log Out
      </Button>
    </div>
  );
};

export default Header;
