import React, { useEffect, useState } from "react";
import Tweet from "./Tweet";
import { useContext } from "react";
import { UserContext } from "../Context/userContext";
import {
  collection,
  limit,
  query,
  orderBy,
  onSnapshot,
  startAt,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../config/config";

const Tweets = () => {
  // const context = useContext(UserContext);
  // const tweets = context.tweets;

  const [tweets, setTweets] = useState(null);
  const [lastDoc, setLastDoc] = useState(null);
  const tweetsList = tweets;

  useEffect(() => {
    getTweets();
    // setIsLoaderOn(false);
  }, []);
  window.onscroll = function (ev) {
    if (window.innerHeight + window.scrollY + 5 >= document.body.scrollHeight) {
      getMoreTweets();
    }
  };
  const getTweets = async () => {
    const userCollectionRef = query(
      collection(db, "tweets"),
      orderBy("date", "desc"),
      limit(10)
    );
    onSnapshot(userCollectionRef, (snapshot) => {
      const document = snapshot.docs.map((doc) => doc.data());
      setTweets(document);
      const lastDocument = document[document.length - 1];
      setLastDoc(lastDocument.date);
    });
  };

  const getMoreTweets = async () => {
    const userCollectionRef = query(
      collection(db, "tweets"),
      orderBy("date", "desc"),
      startAt(lastDoc),
      limit(10)
    );
    onSnapshot(userCollectionRef, (snapshot) => {
      const document = snapshot.docs.map((doc) => doc.data());
      const lastDocument = document[document.length - 1];
      setLastDoc(lastDocument.date);
      const additionalTweets = document.splice(1);
      setTweets([...tweetsList, ...additionalTweets]);
    });
  };

  tweets?.sort((a, b) => b.date.localeCompare(a.date));

  return (
    <div className="tweets">
      {tweets?.map((tweet) => (
        <Tweet key={Date.now()} {...tweet} />
      ))}
    </div>
  );
};

export default Tweets;
