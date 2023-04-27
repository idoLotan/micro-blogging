import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./pages/Home/Home";
import { Routes, Route } from "react-router-dom";
import Profile from "./pages/Profile/Profile";
import Login from "./pages/Login/Login";
import { useState, useEffect } from "react";
import { UserProvider } from "./Context/userContext";
import { userLoggedCheck } from "./Auth/auth";

function App() {
  const [isUserLogged, setIsUserLogged] = useState(false);

  useEffect(() => {
    const userStatus = userLoggedCheck();
    setIsUserLogged(userStatus);
  }, []);

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
            <Route
              path="/Login"
              element={<Login setIsUserLogged={setIsUserLogged} />}
            />
          </Routes>
        ) : (
          <Login />
        )}
      </UserProvider>
    </div>
  );
}

export default App;
