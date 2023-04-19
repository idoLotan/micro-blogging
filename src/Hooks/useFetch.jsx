import { useState } from "react";
import { useContext } from "react";
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
import { UserContext } from "../Context/userContext";

const useFetch = () => {
  const [lastDoc, setLastDoc] = useState();
  const context = useContext(UserContext);
  const tweetsList = context.tweets;
  const currntUserId = context.userId;

  const getTweets = async () => {
    const userCollectionRef = query(
      collection(db, "tweets"),
      orderBy("date", "desc"),
      limit(10)
    );
    onSnapshot(userCollectionRef, (snapshot) => {
      const document = snapshot.docs.map((doc) => doc.data());
      context.setTweets(document);
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
      context.setTweets([...tweetsList, ...additionalTweets]);
    });
  };

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

  return {
    getMoreTweets,
    getTweets,
    changeName,
  };
};

export default useFetch;
