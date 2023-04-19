import "./Login.css";
import useAuth from "../../Hooks/useAuth";
import LoginForm from "../../components/LoginForm";
import RegisterForm from "../../components/RegisterForm";
import { UserContext } from "../../Context/userContext";
import { useContext, useState } from "react";

const Login = () => {
  const { login, register, singInWithGoogle } = useAuth();
  const [isRegistered, setIsRegistered] = useState(true);
  const toggle = () => {
    setIsRegistered(!isRegistered);
  };
  return (
    <>
      {isRegistered ? (
        <LoginForm
          Login={login}
          singInWithGoogle={singInWithGoogle}
          toggle={toggle}
        ></LoginForm>
      ) : (
        <RegisterForm toggle={toggle} register={register}></RegisterForm>
      )}
    </>
  );
};

export default Login;
