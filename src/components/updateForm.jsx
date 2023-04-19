import React from "react";
import { UserContext } from "../Context/userContext";
import { useContext } from "react";
import { Line } from "../layout/Line/Line";
import Icon from "../layout/Icon/Icon";
import useUpdate from "../Hooks/useUpdate";

const UpdateForm = ({ onCancel }) => {
  const context = useContext(UserContext);
  const {
    imageUrl,
    handleClick,
    hiddenFileInput,
    handleSave,
    uploadPic,
    setImageUpload,
    setNewName,
    removePic,
    changeUserName,
  } = useUpdate();

  return (
    <>
      {imageUrl ? (
        <div className="profile-pic-container" onClick={handleClick}>
          <h6 className="profile-pic-text">change picture</h6>
          <img className="profile-pic-page" src={imageUrl}></img>
        </div>
      ) : (
        <div onClick={handleClick} className="profile-pic-page">
          <Icon icon={"user-circle"} size={"fa-7x"}></Icon>
        </div>
      )}
      <button className="btn" onClick={removePic}>
        remove Image
      </button>
      <button className="btn" onClick={uploadPic}>
        Save Image
      </button>
      <input
        type="file"
        className="upload-pic"
        id="file"
        ref={hiddenFileInput}
        onChange={(event) => {
          setImageUpload(event.target.files[0]);
        }}
      />

      <Line>
        <input
          type="text"
          className="input-user-name"
          defaultValue={context.name}
          onChange={(e) => {
            setNewName(e.target.value);
          }}
        />
        <button className="btn" onClick={changeUserName}>
          save name
        </button>
      </Line>
      <button
        className="btn"
        style={{ backgroundColor: "#007BFF", color: "white" }}
        onClick={handleSave}
      >
        save changes
      </button>
      <button
        className="btn"
        style={{ backgroundColor: "#007BFF", color: "white" }}
        onClick={onCancel}
      >
        cancel
      </button>
    </>
  );
};

export default UpdateForm;
