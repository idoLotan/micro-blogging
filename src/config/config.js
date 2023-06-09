import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "@firebase/firestore";
import {
  GoogleAuthProvider,
  getAuth,
  reload,
  signInWithPopup,
} from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDGO0SpNgpe3g_cTm27QRDXTWm3U4fNKp8",
  authDomain: "micro-blogging-464f6.firebaseapp.com",
  projectId: "micro-blogging-464f6",
  storageBucket: "micro-blogging-464f6.appspot.com",
  messagingSenderId: "1054736741357",
  appId: "1:1054736741357:web:c66a318d369fcf93122de4",
  measurementId: "G-TCJHSPFY2M",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export const provider = new GoogleAuthProvider();
export const singInWithGoogle = async (e) => {
  e.preventDefault();
  try {
    const results = await signInWithPopup(auth, provider);
    window.location.reload();
    // console.log(results);
    // const name = results.user.displayName;
    // const email = results.user.email;
    // const profilePic = results.user.photoURL;
    // context.setName(name);
    // context.setEmail(email);
    // context.setProfilePic(profilePic);
    // context.setIsUserLogged(true);
  } catch (err) {
    console.log(err);
  }
};
