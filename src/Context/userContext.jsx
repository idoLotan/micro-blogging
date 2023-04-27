import { onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect, useRef, useState } from "react";
import { auth } from "../config/config";
export const UserContext = createContext(null);
const Provider = UserContext.Provider;

export const UserProvider = ({ children }) => {
  const [tweets, setTweets] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [password, setPassword] = useState("");
  const [userId, setUserId] = useState("");
  const [isUserLogged, setIsUserLogged] = useState(true);
  const [isErorOn, setIsErorOn] = useState(false);
  const [user, setUser] = useState("pedro");
  const authStateRef = useRef(null);

  console.log(isUserLogged);

  useEffect(() => {
    const userLoggedCheck = () => {
      if (localStorage.getItem("currentUser") == false) {
        setIsUserLogged(false);
      } else {
        setIsUserLogged(true);
      }
    };
    userLoggedCheck();
  }, []);

  onAuthStateChanged(auth, (currentUser) => {
    authStateRef.current = currentUser;
    console.log(currentUser);
    if (currentUser == null) {
      localStorage.setItem("currentUser", "");
      localStorage.setItem("TOKEN", "");
      setName("");
      setEmail("");
      setProfilePic("");
      setUserId("");
    } else {
      setName(currentUser.displayName);
      setEmail(currentUser.email);
      setProfilePic(currentUser.photoURL);
      setUserId(currentUser.uid);
      localStorage.setItem("currentUser", currentUser.displayName);
      localStorage.setItem("TOKEN", currentUser.accessToken);
    }
  });

  const globalStates = {
    tweets,
    setTweets,
    name,
    setName,
    email,
    setEmail,
    isErorOn,
    setIsErorOn,
    isUserLogged,
    setIsUserLogged,
    password,
    setPassword,
    profilePic,
    setProfilePic,
    userId,
  };

  return <Provider value={globalStates}>{children}</Provider>;
};
