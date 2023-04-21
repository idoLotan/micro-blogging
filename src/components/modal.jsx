import React from "react";
import ReactDOM from "react-dom";
import { useContext } from "react";
import { UserContext } from "../Context/userContext";
import useAuth from "../Hooks/useAuth";
import Icon from "../layout/Icon/Icon";
import { auth } from "../config/config";
import { signOut } from "firebase/auth";

const Modal = ({ setIsUserLogged }) => {
  const context = useContext(UserContext);

  const logout = async (e) => {
    e.preventDefault();
    await signOut(auth);
    setIsUserLogged(false);
  };
  return ReactDOM.createPortal(
    <React.Fragment>
      <div className="modal-overlay" />
      <div className="modal-wrapper">
        <div className="modal">
          {context.profilePic ? (
            <img className="profile-pic-page" src={context.profilePic} />
          ) : (
            <Icon icon={"user-circle"} size={"fa-4x"}></Icon>
          )}
          <h3 className="modal-title">{context.name}</h3>
          <h6 className="modal-email">{context.email}</h6>
          <button className="btn" onClick={logout}>
            Log out
          </button>
        </div>
      </div>
    </React.Fragment>,
    document.body
  );
};

export default Modal;
