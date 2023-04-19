import React from "react";
import Tweet from "./Tweet";
import { useContext } from "react";
import { UserContext } from "../Context/userContext";

const Tweets = ({ setCount }) => {
  const context = useContext(UserContext);
  const tweets = context.tweets;

  setCount((count) => count + 1);
  tweets.sort((a, b) => b.date.localeCompare(a.date));

  return (
    <div className="tweets">
      {tweets.map((tweet) => (
        <Tweet key={Date.now()} {...tweet} />
      ))}
    </div>
  );
};

export default Tweets;
