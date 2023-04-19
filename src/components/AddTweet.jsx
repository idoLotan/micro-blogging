import React from "react";
import useTweet from "../Hooks/useTweet";

function AddTweet() {
  const { warning, onSubmit, setContent } = useTweet();

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

      <button onClick={onSubmit} className="tweet-button btn">
        Tweet
      </button>
    </form>
  );
}

export default AddTweet;
