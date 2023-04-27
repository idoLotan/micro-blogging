import React, { useEffect, useRef, useState } from "react";
import { UserContext } from "../Context/userContext";
import { useContext } from "react";
import Icon from "../layout/Icon/Icon";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { updateProfile } from "firebase/auth";
import { auth, db, storage } from "../config/config";
import { v4 } from "uuid";
import { collection, doc, onSnapshot, updateDoc } from "firebase/firestore";

const UpdateForm = ({ onCancel }) => {
  const context = useContext(UserContext);
  const [imageUpload, setImageUpload] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [isEditProfile, setIsEditProfile] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const hiddenFileInput = useRef(null);
  const currntUserId = context.userId;

  const nameRef = useRef();
  const emailRef = useRef();

  const changeName = async (newName) => {
    const userCollectionRef = collection(db, "tweets");
    onSnapshot(userCollectionRef, (snapshot) => {
      const tweetsIds = snapshot.docs.map(
        (doc) => doc.data().userId == currntUserId && doc.id
      );
      tweetsIds.forEach((id) => {
        if (id !== false) {
          const docRef = doc(db, "tweets", id);
          updateDoc(docRef, {
            userName: newName,
          });
        }
      });
    });
  };

  useEffect(() => {
    setImageUrl(context.profilePic);
    setIsLoading(true);
  }, []);

  const profileToggle = () => {
    setIsEditProfile(!isEditProfile);
  };

  function handleImageLoaded() {
    setIsLoading(true);
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
    try {
      if (imageUpload == null) return;
      const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
      const snapshot = await uploadBytes(imageRef, imageUpload);
      const url = await getDownloadURL(snapshot.ref);
      setImageUrl(url);
      await updateProfile(auth.currentUser, {
        photoURL: url,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const removePic = () => {
    updateProfile(auth.currentUser, {
      photoURL: "",
    });
    setImageUrl(false);
  };

  const changeUserName = async () => {
    const resp = await updateProfile(auth.currentUser, {
      displayName: nameRef.current.value,
    });
    const resp2 = await changeName(nameRef.current.value);
  };

  // const changeEmail = async () => {
  //   const resp = await updateProfile(auth.currentUser, {
  //     email: emailRef.current.value,
  //   });
  //   const resp2 = await changeEmail(emailRef.current.value);
  // };

  const handleClick = () => {
    hiddenFileInput.current.click();
  };

  const handleSave = async () => {
    await uploadPic();
    await changeUserName();
    // await changeEmail();
    profileToggle();
    window.location.reload();
  };

  return (
    <div
      className="update-form"
      style={{ display: isLoading ? "block" : "none" }}
    >
      <div className="update-form-section">
        {imageUrl ? (
          <div>
            <div className="image-container">
              <div className="profile-pic-container" onClick={handleClick}>
                <img
                  onLoad={handleImageLoaded}
                  className="profile-pic-page"
                  src={imageUrl}
                ></img>

                <div className="container-half-width">
                  <div className="half-width"></div>

                  <Icon
                    icon={"camera"}
                    className={"image-icon"}
                    size={"fa-lg"}
                  ></Icon>
                </div>
              </div>
              <h3 className="col">{context.name}</h3>
            </div>
          </div>
        ) : (
          <div onClick={handleClick} className="profile-pic-page">
            <Icon icon={"user-circle"} size={"fa-8x"}></Icon>
            <h3 className="col">{context.name}</h3>
          </div>
        )}
        <div className="update-form-title">
          <h2>Account Setting</h2>
        </div>
      </div>

      <div className="update-form-input">
        <div>User name:</div>
        <input
          type="text"
          className="input-user "
          defaultValue={context.name}
          ref={nameRef}
        />
        <div className="pad"></div>
        {/* <div>Email:</div>
        <input
          type="text"
          className="input-user "
          defaultValue={context.email}
          ref={emailRef}
        /> */}

        <input
          type="file"
          className="upload-pic"
          id="file"
          ref={hiddenFileInput}
          onChange={handleFileUpload}
          style={{ display: "none" }}
        />
      </div>
      <div className="update-form-buttons">
        <button className="blue-instance btn" onClick={handleSave}>
          Update
        </button>
        <button className="btn" onClick={onCancel}>
          cancel
        </button>
        <button className="btn" onClick={removePic}>
          delete image
        </button>
      </div>
    </div>
  );
};

export default UpdateForm;
