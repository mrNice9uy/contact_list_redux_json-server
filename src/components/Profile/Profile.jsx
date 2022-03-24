import PropTypes from "prop-types";
import React from "react";
import { useSelector } from "react-redux";

const Profile = () => {
  const userState = useSelector((state) => state.user.user);

  return (
    <div id="profile" className="profile">
      <h3>Hello, {`${userState?.user?.name || "Stranger"}`}!</h3>
      <h4>Check your contact list</h4>
    </div>
  );
};

Profile.propTypes = {
  userState: PropTypes.shape({
    accessToken: PropTypes.string.isRequired,
    user: PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      email: PropTypes.string,
    }),
  }),
};

export default Profile;
