import "./App.css";
import Navbar from "./components/Navbar";
import React, { useContext } from "react";
import Home from "./pages/Home/Home";
import { Routes, Route } from "react-router-dom";
import Profile from "./pages/Profile/Profile";
import Login from "./pages/Login/Login";
import { useState, useEffect, useRef } from "react";
import { UserContext, UserProvider } from "./Context/userContext";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./config/config";

function App() {
  const context = useContext(UserContext);

  const [isUserLogged, setIsUserLogged] = useState(null);

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

  // onAuthStateChanged(auth, (currentUser) => {
  //   authStateRef.current = currentUser;
  //   console.log(currentUser);
  //   if (currentUser == null) {
  //     localStorage.setItem("currentUser", "");
  //     setName("");
  //     setEmail("");
  //     setProfilePic("");
  //     setUserId("");
  //   } else {
  //     setName(currentUser.displayName);
  //     setEmail(currentUser.email);
  //     setProfilePic(currentUser.photoURL);
  //     setUserId(currentUser.uid);
  //     localStorage.setItem("currentUser", currentUser.displayName);
  //   }
  // });

  return (
    <div className="App">
      <UserProvider>
        <Navbar
          setIsUserLogged={setIsUserLogged}
          displayNavbar={isUserLogged}
        />

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
      </UserProvider>
    </div>
  );
}

export default App;
