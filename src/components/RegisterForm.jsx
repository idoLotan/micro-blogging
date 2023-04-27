import React, { useContext, useRef } from "react";
import { UserContext } from "../Context/userContext";
import {
  createUserWithEmailAndPassword,
  getAuth,
  updateProfile,
} from "firebase/auth";
import { db } from "../config/config";
import { addDoc, collection } from "firebase/firestore";

const RegisterForm = ({ toggle }) => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const nameRef = useRef();
  const context = useContext(UserContext);

  const register = async (e) => {
    e.preventDefault();
    try {
      const auth = getAuth();
      const resp = await createUserWithEmailAndPassword(
        auth,
        emailRef.current.value,
        passwordRef.current.value
      );

      updateProfile(auth.currentUser, {
        displayName: nameRef.current.value,
      });
      const userCollectionRef = collection(db, "users");
      await addDoc(userCollectionRef, {
        userName: nameRef.current.value,
        userId: auth.currentUser.uid,
      });

      context.setIsUserLogged(true);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  // async function handleRegister() {
  //   const user = await register();
  //   console.log(user);
  //   const resp = await login();
  //   console.log(resp);
  // }

  return (
    <div className="login">
      <form className="login-form">
        <h3 className="login-title"> create your account</h3>
        <input
          type="text"
          className="input-user"
          placeholder="email..."
          ref={emailRef}
        />
        <input
          type="password"
          className="input-user"
          placeholder="password..."
          ref={passwordRef}
        />
        <input
          type="text"
          className="input-user"
          placeholder="name..."
          ref={nameRef}
        />
        <button className="btn" onClick={register}>
          save
        </button>
        <div className="user-register">
          <h6> dont have an account?</h6>
          <h6 onClick={toggle}>Login</h6>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
