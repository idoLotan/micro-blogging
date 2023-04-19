// import { useContext } from "react";
// import {
//   GoogleAuthProvider,
//   signInWithPopup,
//   createUserWithEmailAndPassword,
//   signInWithEmailAndPassword,
//   updateProfile,
//   getAuth,
//   signOut,
// } from "firebase/auth";
// import { UserContext } from "../Context/userContext";
// import { auth } from "../config/config";
// import { collection, addDoc } from "firebase/firestore";
// import { db } from "../config/config";
// const context = useContext(UserContext);
// const provider = new GoogleAuthProvider();

// export const singInWithGoogle = async (e) => {
//   e.preventDefault();
//   try {
//     const results = await signInWithPopup(auth, provider);
//     const name = results.user.displayName;
//     const email = results.user.email;
//     const profilePic = results.user.photoURL;
//     context.setName(name);
//     context.setEmail(email);
//     context.setProfilePic(profilePic);
//     context.setIsUserLogged(true);
//   } catch (err) {
//     console.log(err);
//   }
// };

// export const register = async (e) => {
//   e.preventDefault();
//   try {
//     const auth = getAuth();
//     const user = await createUserWithEmailAndPassword(
//       auth,
//       context.email,
//       context.password
//     );
//     updateProfile(auth.currentUser, {
//       displayName: context.name,
//     });
//     createUserIdAndName(auth.currentUser.uid);
//     context.setIsUserLoged(true);
//   } catch (err) {
//     console.log(err);
//   }
// };

// export const login = async (e) => {
//   e.preventDefault();
//   try {
//     const user = await signInWithEmailAndPassword(
//       auth,
//       context.email,
//       context.password
//     );
//     context.setIsUserLogged(true);
//   } catch (err) {
//     console.log(err.message);
//   }
// };

// export const logout = async (e) => {
//   e.preventDefault();
//   await signOut(auth);
//   context.setIsUserLogged(false);
// };

// export const createUserIdAndName = async (uid) => {
//   const userCollectionRef = collection(db, "users");
//   await addDoc(userCollectionRef, {
//     userName: context.name,
//     userId: uid,
//   });
// };
