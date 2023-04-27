import { UserContext } from "../../Context/userContext";
import { useContext, useState } from "react";
import "./Profile.css";
import UpdateForm from "../../components/updateForm";
import Icon from "../../layout/Icon/Icon";

const Profile = () => {
  const context = useContext(UserContext);
  const [toggleProfile, setToggleProfile] = useState(false);

  const handleProfile = () => {
    setToggleProfile(!toggleProfile);
  };

  return (
    <div className="profile">
      <div className="profile-title"></div>
      {toggleProfile ? (
        <UpdateForm onCancel={handleProfile} />
      ) : (
        <div className="profile-section row between">
          <div className="row">
            {context.profilePic ? (
              <img src={context.profilePic} className="profile-pic-page" />
            ) : (
              <Icon icon={"user-circle"} size={"fa-7x"}></Icon>
            )}
            <div className="pad">
              <h2>{context.name}</h2>
              <h4>{context.email}</h4>
            </div>
          </div>
          <button onClick={handleProfile} className="btn update-btn">
            update your profile
            <Icon icon={"pen"} />
          </button>

          {/* <h5 onClick={handleProfile}>update your profile?</h5> */}
        </div>
      )}
    </div>
  );
};

export default Profile;
