import React, { useContext, useRef } from "react";
import { UserContext } from "../Context/userContext";
import { login } from "../Auth/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/config";

const LoginForm = ({ Login, singInWithGoogle, toggle }) => {
  const context = useContext(UserContext);
  const emailRef = useRef();
  const passwordRef = useRef();

  // console.log(emailRef.current.value);

  const login = async (e) => {
    e.preventDefault();
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        emailRef.current.value,
        passwordRef.current.value
      );
      // console.log(user);
      context.setIsUserLogged(true);
    } catch (err) {
      console.log(err.message);
    }
  };

  // console.log(emailRef.current.value);
  // console.log(passwordRef.current.value);
  return (
    <div className="login">
      <form className="login-form">
        <h3 className="login-title">Welcome back</h3>
        <input
          type="text"
          className="input-user"
          placeholder="email..."
          // onChange={(e) => {
          //   context.setEmail(e.target.value);
          // }}
          ref={emailRef}
        />
        <input
          type="password"
          className="input-user"
          placeholder="password..."
          // onChange={(e) => {
          //   context.setPassword(e.target.value);
          // }}
          ref={passwordRef}
        />
        <button onClick={login} className="btn login-btn">
          Login
        </button>
        <div className="user-register">
          <h6> dont have an account?</h6>
          <h6 onClick={toggle}>Sign in</h6>
        </div>
        <div className="login-divide">
          <div className="login-divide-element"></div>
          OR
          <div className="login-divide-element"></div>
        </div>

        <button
          className="btn login-with-google-btn"
          onClick={singInWithGoogle}
        >
          Log in with google
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
