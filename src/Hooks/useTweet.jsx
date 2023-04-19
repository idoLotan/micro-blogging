import { useState } from "react";
import { useContext } from "react";
import { collection, addDoc } from "firebase/firestore";
import { UserContext } from "../Context/userContext";
import { db } from "../config/config";
import { formatDate } from "../utils/utils";

const useTweet = () => {
  const [warning, setWarning] = useState("");
  const [content, setContent] = useState("");
  const context = useContext(UserContext);

  const createTweet = async () => {
    const userCollectionRef = collection(db, "tweets");
    await addDoc(userCollectionRef, {
      content: content,
      date: formatDate(new Date()),
      userName: context.name,
      userId: context.userId,
      key: Date.now(),
    });
  };

  const checkForm = () => {
    const textLength = content.length;
    textLength > 140
      ? setWarning("The tweet can't contain more then 140 chars.")
      : setWarning("");
    return textLength < 140;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    checkForm() && createTweet();
  };

  return { warning, onSubmit, checkForm, content, setContent };
};

export default useTweet;
