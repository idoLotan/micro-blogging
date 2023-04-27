import React from "react";

const Tweet = ({ userName, date, content }) => {
  return (
    <div className="tweet">
      <div className="row between">
        <div className="name">{userName}</div>
        <div className="tweet-date">{date}</div>
      </div>
      <div className="tweet-text">{content}</div>
    </div>
  );
};

export default Tweet;
