import React, { useEffect, useRef, useState } from "react";
import { UserContext } from "../Context/userContext";
import { useContext } from "react";
import { Line } from "../layout/Line/Line";
import Icon from "../layout/Icon/Icon";
import useUpdate from "../Hooks/useUpdate";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { updateProfile } from "firebase/auth";
import { auth, storage } from "../config/config";
import { v4 } from "uuid";
import useFetch from "../Hooks/useFetch";

const UpdateForm = ({ onCancel }) => {
  const context = useContext(UserContext);
  const [imageUpload, setImageUpload] = useState(null);
  const [imageUrl, setImageUrl] = useState("");

  const [isEditProfile, setIsEditProfile] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const hiddenFileInput = useRef(null);
  const { changeName } = useFetch();

  const nameRef = useRef();

  useEffect(() => {
    setImageUrl(context.profilePic);
  }, []);

  const profileToggle = () => {
    setIsEditProfile(!isEditProfile);
  };

  function handleImageLoaded() {
    setIsLoading(false);
  }

  const handleFileUpload = (event) => {
    setImageUpload(event.target.files[0]);
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      const url = reader.result;
      setImageUrl(url);
    };
    reader.readAsDataURL(file);
  };

  const uploadPic = async () => {
    if (imageUpload == null) return;
    const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
    const snapshot = await uploadBytes(imageRef, imageUpload);
    const url = await getDownloadURL(snapshot.ref);
    setImageUrl(url);
    await updateProfile(auth.currentUser, {
      photoURL: url,
    });
  };

  const removePic = () => {
    updateProfile(auth.currentUser, {
      photoURL: "",
    });
    setImageUrl(false);
  };

  const changeUserName = () => {
    updateProfile(auth.currentUser, {
      displayName: nameRef.current.value,
    });
    changeName(nameRef.current.value);
  };

  const handleClick = () => {
    hiddenFileInput.current.click();
  };

  const handleSave = async () => {
    await uploadPic();
    changeUserName();
    profileToggle();
    window.location.reload();
  };

  return (
    <div
      className="update-form"
      style={{ display: isLoading ? "none" : "block" }}
    >
      {imageUrl ? (
        <>
          <div className="profile-pic-container" onClick={handleClick}>
            {/* <h6 className="profile-pic-text">change picture</h6> */}
            <img
              onLoad={handleImageLoaded}
              className="profile-pic-page"
              src={imageUrl}
            ></img>

            <div className="container-half-width">
              <div className="half-width"></div>
              <Icon icon={"camera"} className={"image-icon"}></Icon>
            </div>
          </div>
        </>
      ) : (
        <div onClick={handleClick} className="profile-pic-page">
          <Icon icon={"user-circle"} size={"fa-7x"}></Icon>
        </div>
      )}
      <input
        type="file"
        className="upload-pic"
        id="file"
        ref={hiddenFileInput}
        onChange={handleFileUpload}
      />
      {/* <div>
        <input type="file" onChange={handleFileUpload} />
        {imageUrl && <img src={imageUrl} alt="Uploaded" />}
      </div> */}

      <Line>
        <input
          type="text"
          className="input-user"
          defaultValue={context.name}
          ref={nameRef}
        />
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
    </div>
  );
};

export default UpdateForm;
