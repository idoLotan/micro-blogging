import "./App.css";
import Navbar from "./components/Navbar";
import React from "react";
import Home from "./pages/Home/Home";
import { Routes, Route } from "react-router-dom";
import Profile from "./pages/Profile/Profile";
import Login from "./pages/Login/Login";
import { useState, useEffect, useRef } from "react";
import { UserContext } from "./Context/userContext";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./config/config";

function App() {
  const [tweets, setTweets] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [password, setPassword] = useState("");
  const [userId, setUserId] = useState("");
  const [isUserLogged, setIsUserLogged] = useState(true);
  const [isErorOn, setIsErorOn] = useState(false);
  const authStateRef = useRef(null);

  useEffect(() => {
    userLoggedCheck();
  }, []);

  onAuthStateChanged(auth, (currentUser) => {
    authStateRef.current = currentUser;
    if (currentUser == null) {
      localStorage.setItem("currentUser", "");
    } else {
      setName(currentUser.displayName);
      setEmail(currentUser.email);
      setProfilePic(currentUser.photoURL);
      setUserId(currentUser.uid);
      localStorage.setItem("currentUser", currentUser.displayName);
    }
  });

  const userLoggedCheck = () => {
    if (localStorage.getItem("currentUser") == false) {
      setIsUserLogged(false);
    } else {
      setIsUserLogged(true);
    }
  };

  const globalStates = {
    authStateRef,
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

  return (
    <div className="App">
      <UserContext.Provider value={globalStates}>
        <Navbar />

        {isUserLogged ? (
          <Routes>
            <Route path="*" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/Login" element={<Login />} />
          </Routes>
        ) : (
          <Login />
        )}
      </UserContext.Provider>
    </div>
  );
}

export default App;
