import {
  collection,
  limit,
  query,
  orderBy,
  onSnapshot,
  startAt,
} from "firebase/firestore";
import { db } from "../config/config";

export const getTweets = async () => {
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

export const getMoreTweets = async () => {
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
