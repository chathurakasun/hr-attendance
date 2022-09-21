/* eslint-disable */
import { createContext, useContext, useState } from "react";

import { useAuthContext } from "./auth-context";
import useHttp from "../hooks/use-http";

//--------------------------------------------------------
const AttContext = createContext();

const initialAttState = {
  // userId: "",
  // dayId: "",
  inT: "",
  outT: "",
  duration: "",
};

//----------------------------------------
export const AttContextProvider = ({ children }) => {
  const { userEmail } = useAuthContext();
  const [att, setAtt] = useState(initialAttState); // to store POST att
  const [controlAtt, setControAtt] = useState([]); // this is for prevent duplicate IN/OUT
  const [calendarAtt, setCalendarAtt] = useState({}); // to display selected one daye details
  const [inquiry, setInquiry] = useState([]);

  //---------------------------------------------------
  const { sendRequest } = useHttp();
  const successPostAtt = (successdata) => {
    console.log("ATT POST Happened", successdata);
  };

  const transformGetAtt = (getAtt) => {
    console.log("Successful ATT GET Happened");
    if (!getAtt || !getAtt.outT) {
      // whole day would not found or OUT not marked, these days should be marked red
      console.log("SELECTED DATE NOT FOUND !!!!");
      setCalendarAtt({ inT: "", outT: "", duration: "" });
      return;
    }

    setCalendarAtt(getAtt); // replace everytime
  };

  //attendance IN and OUT actions
  const setInTimeHandler = () => {
    console.log("IN");
    const inTimestamp = Date.now();
    const { today, yymm } = dateHandler(inTimestamp);
    att.inT = inTimestamp;

    const user = extractUserName(userEmail);
    controlAttHandler("x");
    // fetch
    sendRequest(
      {
        url: `https://hrm-cks-default-rtdb.asia-southeast1.firebasedatabase.app/${user}/${yymm}/${today}.json`,
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: att,
      },
      successPostAtt
    );
  };
  //-----------------------------------------------------------------------------------------------------------
  const setOutTimeHandler = () => {
    console.log("OUT");
    const outTimeStamp = Date.now() + 8 * 60 * 60 * 1000; // manual work hour adding
    const { today, yymm } = dateHandler(outTimeStamp);

    // add 8 hours for manually give worktime
    att.outT = outTimeStamp;
    const { hr, mins } = extractHrMin(att.outT, att.inT);
    // att.duration = `${hr}:${mins}`;
    att.duration = hr;

    const user = extractUserName(userEmail);

    controlAttHandler("y");

    //fetch
    sendRequest(
      {
        url: `https://hrm-cks-default-rtdb.asia-southeast1.firebasedatabase.app/${user}/${yymm}/${today}.json`,
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: att,
      },
      successPostAtt
    );
  };

  //--------------------control att---------------------------------------------------------------------
  const controlAttHandler = (value) => {
    controlAtt.push(value);
  };

  //////////////////Calender data Rendering /////////////////////////////////////////////

  const calendarSelectHandler = (e) => {
    const [yy, mm, dd] = e.target.value.split("-");
    const user = extractUserName(userEmail);

    // fetch to get att data from server to display
    sendRequest(
      {
        url: `https://hrm-cks-default-rtdb.asia-southeast1.firebasedatabase.app/${user}/${yy}${mm}/${yy}${mm}${dd}.json`,
      },
      transformGetAtt
    );
  };

  const inquiryHandler = () => {
    let inq = document.getElementById("inquiry").value;

    inquiry.push(inq);
    console.log(inquiry);

    document.getElementById("inquiry").value = "";
  };

  //---------------------------------------------------------------------
  return (
    <AttContext.Provider
      value={{
        att,
        setAtt,
        setInTimeHandler,
        setOutTimeHandler,
        controlAttHandler,
        setControAtt,
        calendarSelectHandler,
        calendarAtt,
        inquiryHandler,
      }}
    >
      {children}
    </AttContext.Provider>
  );
};

export const useAttContext = () => useContext(AttContext);

//---------------HELPERS---------------------
export const dateHandler = (timestamp) => {
  const date = new Date(timestamp + -0 * 24 * 60 * 60 * 1000); // manual day changing

  const yy = String(date.getFullYear());
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  // const hr = date.getHours().padStart(2, 0);
  // const min = date.getMinutes().padStart(2, 0);

  const today = Number(`${yy}${mm}${dd}`);
  const yymm = Number(`${yy}${mm}`);
  return { today, yymm };
};

export const extractUserName = (enteredName) => {
  // return enteredName.substr(0, 3); // get 3 characters
  return enteredName.slice(0, enteredName.indexOf("@"));
};

export const extractHrMin = (outStamp, inStamp) => {
  const [hr, minlong] = ((outStamp - inStamp) / (1000 * 60 * 60))
    .toString()
    .split(".");

  const mins = String(minlong.slice(0, 2) * 0.6).padStart(2, "0");

  return { hr, mins };
};
