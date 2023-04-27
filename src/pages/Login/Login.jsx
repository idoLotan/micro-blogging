import "./Login.css";
import LoginForm from "../../components/LoginForm";
import RegisterForm from "../../components/RegisterForm";
import { useState } from "react";

const Login = ({ setIsUserLogged }) => {
  const [isRegistered, setIsRegistered] = useState(true);
  const toggle = () => {
    setIsRegistered(!isRegistered);
  };
  return (
    <>
      {isRegistered ? (
        <LoginForm
          toggle={toggle}
          setIsUserLogged={setIsUserLogged}
        ></LoginForm>
      ) : (
        <RegisterForm
          toggle={toggle}
          setIsUserLogged={setIsUserLogged}
        ></RegisterForm>
      )}
    </>
  );
};

export default Login;
