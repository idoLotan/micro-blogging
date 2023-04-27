import React from "react";
import { Link } from "react-router-dom";

import Modal from "./modal";
import { useState, useContext } from "react";
import Icon from "../layout/Icon/Icon";
import { UserContext } from "../Context/userContext";

const Navbar = ({ setIsUserLogged, displayNavbar }) => {
  const [profileClicked, setProfileClicked] = useState(false);
  const context = useContext(UserContext);

  const triggerPopUp = () => {
    setProfileClicked(!profileClicked);
  };

  return (
    <div
      className="nav-bar"
      style={{ display: displayNavbar ? "block" : "none" }}
    >
      <div className="row between">
        <div className="row">
          <Link to="/home">
            <div className="menu-item"> Home</div>
          </Link>
          <Link to="/profile">
            <div className="menu-item"> Profile</div>
          </Link>
        </div>

        {context.profilePic ? (
          <img
            className="profile-pic-navbar"
            src={context.profilePic}
            onClick={triggerPopUp}
          />
        ) : (
          <Icon icon={"user-circle"} onClick={triggerPopUp} size={"fa-lg"} />
        )}

        {profileClicked &&
          (displayNavbar ? <Modal setIsUserLogged={setIsUserLogged} /> : <></>)}
      </div>
    </div>
  );
};

export default Navbar;
