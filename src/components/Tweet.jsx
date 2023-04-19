import React from "react";
import { Between } from "../layout/Line/Line";

const Tweet = ({ userName, date, content }) => {
  return (
    <div className="tweet">
      <Between>
        <div className="name">{userName}</div>
        <div className="tweet-date">{date}</div>
      </Between>
      <div className="tweet-text">{content}</div>
    </div>
  );
};

export default Tweet;
