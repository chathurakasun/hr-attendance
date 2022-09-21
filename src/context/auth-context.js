/* eslint-disable */
import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthContextProvider = (props) => {
  const initToken = localStorage.getItem("token");
  const initEmail = localStorage.getItem("userEmail");
  const initName = localStorage.getItem("userName");

  const [userEmail, setUserEmail] = useState(initEmail);
  const [userName, setUserName] = useState(initName);
  const [token, setToken] = useState(initToken);

  const [activeMenu, setActiveMenu] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [today, setToday] = useState({
    yy: localStorage.getItem("today-yy"),
    mm: localStorage.getItem("today-mm"),
    dd: localStorage.getItem("today-dd"),
  });
  const userIsLoggedIn = !!token;

  const loginHandler = (token) => {
    setToken(token);
    console.log("LOG IN SUCCESSFUL >>>>>");
    localStorage.setItem("token", token);

    //set login dateTime
    const loginStamp = Date.now(); // milliseconds
    const { yy, mm, dd } = dateHandler(loginStamp);
    today.yy = yy;
    today.mm = mm;
    today.dd = dd;
    console.log(today);

    localStorage.setItem("today-yy", today.yy);
    localStorage.setItem("today-mm", today.mm);
    localStorage.setItem("today-dd", today.dd);
  };
  //------------------------------------------------------------------------------
  const logoutHandler = () => {
    setToken(null);
    setUserEmail(null);
    setUserName(null);
    localStorage.removeItem("token");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userName");
    // localStorage.removeItem("today");
    localStorage.removeItem("today-yy", today.yy);
    localStorage.removeItem("today-mm", today.mm);
    localStorage.removeItem("today-dd", today.dd);
  };
  //------------------------------------------------------------------------------

  const userIdHandler = (email) => {
    setUserEmail(email);

    setUserName(extractUserName(email));
    localStorage.setItem("userEmail", email);
    localStorage.setItem("userName", extractUserName(email));
  };
  //------------------------------------------------------------------------------

  //-----------------------------------------------------------------------
  return (
    <AuthContext.Provider
      value={{
        activeMenu,
        setActiveMenu,
        loginHandler,
        logoutHandler,
        isLoggedIn: userIsLoggedIn,
        userEmail,
        userName,
        userIdHandler,

        today,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
//------------------------------------------------------

export const dateHandler = (timestamp) => {
  const t = new Date(timestamp);
  const yy = String(t.getFullYear());
  const mm = String(t.getMonth() + 1).padStart(2, "0");
  const dd = String(t.getDate()).padStart(2, "0");

  // const today = Number(`${yy}${mm}${dd}`);
  return { yy, mm, dd };
};

export const extractUserName = (enteredName) => {
  // return enteredName.substr(0, 3); // get 3 characters
  return enteredName.slice(0, enteredName.indexOf("@"));
};
