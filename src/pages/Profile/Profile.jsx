import { UserContext } from "../../Context/userContext";
import { Line } from "../../layout/Line/Line";
import { Rows } from "../../layout/Rows/Rows";
import { useContext, useState } from "react";
import "./Profile.css";
import UpdateForm from "../../components/updateForm";
import useAuth from "../../Hooks/useAuth";
import Icon from "../../layout/Icon/Icon";
import useUpdate from "../../Hooks/useUpdate";

const Profile = () => {
  const context = useContext(UserContext);
  const { logout } = useAuth();
  const { profileToggle, isEditProfile } = useUpdate();
  const [toggleProfile, setToggleProfile] = useState(false);

  const handleProfile = () => {
    setToggleProfile(!toggleProfile);
  };

  return (
    <div className="profile">
      <div className="profile-title">profile</div>
      {toggleProfile ? (
        <UpdateForm onCancel={handleProfile} />
      ) : (
        <form className="profile-form">
          <Line>
            {context.profilePic ? (
              <img src={context.profilePic} className="profile-pic-page" />
            ) : (
              <Icon icon={"user-circle"} size={"fa-7x"}></Icon>
            )}
            <Rows>
              <h2>{context.name}</h2>
              <h4>{context.email}</h4>
            </Rows>
          </Line>

          <button onClick={handleProfile} className="btn logout-btn">
            update profile
          </button>
        </form>
      )}
    </div>
  );
};

export default Profile;
