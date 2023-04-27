import React, { useContext, useState } from "react";
import { UserContext } from "../Context/userContext";
import { db } from "../config/config";
import { addDoc, collection } from "firebase/firestore";
import { formatDate } from "../utils/utils";

function AddTweet() {
  const [warning, setWarning] = useState("");
  const [content, setContent] = useState("");
  const { name, userId } = useContext(UserContext);

  formatDate(new Date());

  const createTweet = async () => {
    const userCollectionRef = collection(db, "tweets");
    await addDoc(userCollectionRef, {
      content: content,
      date: formatDate(new Date()),
      userName: name,
      userId: userId,
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

  return (
    <form className="add-form">
      <textarea
        onChange={(e) => {
          setContent(e.target.value);
        }}
        set
        placeholder="What you have on your mind?"
        className="add-tweet"
      ></textarea>
      <div className="warning">{warning}</div>

      <button onClick={onSubmit} className="tweet-btn btn" type="">
        Tweet
      </button>
    </form>
  );
}

export default AddTweet;
