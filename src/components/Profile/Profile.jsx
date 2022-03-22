import React from "react";
import { useSelector } from "react-redux";
//import { Button } from "antd";

const Profile = () => {
  const userState = useSelector(state => state.user.user);
  console.log('userState: ', userState);
  return (
    <div id="profile" className="profile">
      <h3>Hello, {`${userState?.user?.email}`}</h3>
    </div>
  );
};

export default Profile;
