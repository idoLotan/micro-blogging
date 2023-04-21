import React, { useContext, useRef } from "react";
import { UserContext } from "../Context/userContext";
import { login } from "../Auth/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, singInWithGoogle } from "../config/config";
import useAuth from "../Hooks/useAuth";

const LoginForm = ({ toggle }) => {
  const context = useContext(UserContext);
  const emailRef = useRef();
  const passwordRef = useRef();

  const login = async (e) => {
    e.preventDefault();
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        emailRef.current.value,
        passwordRef.current.value
      );
      context.setIsUserLogged(true);
      window.location.reload();
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className="login">
      <form className="login-form">
        <h3 className="login-title">Welcome back</h3>
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
