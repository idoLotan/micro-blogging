import { useContext } from "react";
import {
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  getAuth,
  signOut,
} from "firebase/auth";
import { UserContext } from "../Context/userContext";
import { auth } from "../config/config";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../config/config";

const useAuth = () => {
  const context = useContext(UserContext);

  // const provider = new GoogleAuthProvider();
  // const singInWithGoogle = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const results = await signInWithPopup(auth, provider);
  //     // const name = results.user.displayName;
  //     // const email = results.user.email;
  //     // const profilePic = results.user.photoURL;
  //     // context.setName(name);
  //     // context.setEmail(email);
  //     // context.setProfilePic(profilePic);
  //     // context.setIsUserLogged(true);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  const register = async (e) => {
    e.preventDefault();
    try {
      const auth = getAuth();
      const user = await createUserWithEmailAndPassword(
        auth,
        context.email,
        context.password
      );
      updateProfile(auth.currentUser, {
        displayName: context.name,
      });
      createUserIdAndName(auth.currentUser.uid);
      context.setIsUserLoged(true);
    } catch (err) {
      console.log(err);
    }
  };

  const login = async (e) => {
    e.preventDefault();
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        context.email,
        context.password
      );
      context.setIsUserLogged(true);
    } catch (err) {
      console.log(err.message);
    }
  };

  const logout = async (e) => {
    e.preventDefault();
    await signOut(auth);
    context.setIsUserLogged(false);
  };

  const createUserIdAndName = async (uid) => {
    const userCollectionRef = collection(db, "users");
    await addDoc(userCollectionRef, {
      userName: context.name,
      userId: uid,
    });
  };

  return {
    login,
    register,
    // singInWithGoogle,
    logout,
  };
};

export default useAuth;
