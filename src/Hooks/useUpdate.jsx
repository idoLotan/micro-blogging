import { updateProfile } from "firebase/auth";
import { useState, useEffect, useContext, useRef } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import { storage, auth } from "../config/config";
import { UserContext } from "../Context/userContext";
import useFetch from "./useFetch";

const useUpdate = () => {
  const context = useContext(UserContext);
  const [imageUpload, setImageUpload] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [newName, setNewName] = useState("");
  const [isEditProfile, setIsEditProfile] = useState(false);
  const hiddenFileInput = useRef(null);
  const { changeName } = useFetch();

  useEffect(() => {
    setImageUrl(context.profilePic);
  }, []);

  const profileToggle = () => {
    setIsEditProfile(!isEditProfile);
  };

  const uploadPic = () => {
    if (imageUpload == null) return;
    const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setImageUrl(url);
        updateProfile(auth.currentUser, {
          photoURL: url,
        });
      });
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
      displayName: newName,
    });
    changeName(newName);
  };

  const handleClick = () => {
    hiddenFileInput.current.click();
  };

  const handleSave = () => {
    uploadPic();
    profileToggle();
    window.location.reload();
  };

  return {
    changeUserName,
    imageUrl,
    handleClick,
    hiddenFileInput,
    handleSave,
    uploadPic,
    setImageUpload,
    setNewName,
    removePic,
    profileToggle,
    isEditProfile,
  };
};

export default useUpdate;
