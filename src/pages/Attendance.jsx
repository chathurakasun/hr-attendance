/* eslint-disable */

import React from "react";
import { Header } from "../components";

import { useAttContext } from "../context/att-context";
import { useAuthContext } from "../context/auth-context";
//-------------------------------------------------------------
const Attendance = () => {
  console.log("Attendance runs----------");
  const { today } = useAuthContext();
  const {
    setInTimeHandler,
    setOutTimeHandler,
    setSubmitTimeHandler,
    resetHandler,
    calendarSelectHandler,
    calendarAtt,
    inquiryHandler,
  } = useAttContext();

  const int = calendarAtt.inT
    ? `${new Date(calendarAtt.inT).getHours()} hr ${new Date(
        calendarAtt.inT
      ).getMinutes()} min `
    : " no entry ";
  const out = calendarAtt.outT
    ? `${new Date(calendarAtt.outT).getHours()} hr ${new Date(
        calendarAtt.outT
      ).getMinutes()} min `
    : " no entry ";

  return (
    <>
      <Header category="" title="Attendance" className="mt-5" />
      <div title="container 1" className="flex justify-center flex-wrap">
        {/* Mark Attendance left */}
        <div className="m-2 p-2 md:m-10 md:p-10 bg-slate-300 rounded-3xl ">
          <div>
            <p className="text-xl font-semibold">Mark Your Attendance</p>
          </div>
          <div
            className="flex justify-center
           gap-5  mt-5  border-b-2 border-blue-300 border-color"
          >
            <div className="mt-3 mb-5">
              <button
                onClick={setInTimeHandler}
                className="p-3 hover:drop-shadow-xl"
                style={{
                  borderRadius: "10px",
                  color: "white",
                  backgroundColor: "blue",
                }}
              >
                IN
              </button>
            </div>
            <div className="mt-3 mb-5">
              <button
                onClick={setOutTimeHandler}
                className="p-3 hover:drop-shadow-xl"
                style={{
                  borderRadius: "10px",
                  color: "white",
                  backgroundColor: "blue",
                }}
              >
                OUT
              </button>
            </div>
          </div>
          <p className="text-xs  font-semibold rounded-lg w-24 bg-orange-400 py-0.5 px-2 text-black mt-5">
            {today.yy} : {today.mm} : {today.dd}
          </p>

          <div className="flex gap-4 border-b-1 border-color mt-6"></div>

          <button onClick={resetHandler}>reset ATT</button>
        </div>

        {/* calendar one day details  right */}
        <div className="m-2 p-4 md:m-10 md:p-10 bg-slate-100 rounded-3xl">
          <div>
            <p className=" w-80 font-semibold">Check your Attendance</p>
          </div>
          <div className="flex flex-col mt-5">
            <label htmlFor="date">Select the date</label>
            <input id="date" type="date" onChange={calendarSelectHandler} />
          </div>
          <div className="flex mt-5 justify-around">
            <p>In time </p>{" "}
            <p className="border-1 bg-blue-100 w-56 rounded-xl">{int}</p>
          </div>
          <div className="flex mt-1 justify-around">
            <p>Out time </p>{" "}
            <p className="border-1 bg-blue-100 w-56 rounded-xl">{out}</p>
          </div>
          <div className="flex mt-5 gap-2">
            <p>Work Duration </p>{" "}
            <p className="border-1 bg-gray w-56 rounded-xl">
              {" "}
              {calendarAtt.duration !== "" ? calendarAtt.duration : " "}{" "}
              (hr:min)
            </p>
          </div>
          <div className="mt-5">
            <p>Inquiry </p>{" "}
            <textarea
              type="text"
              id="inquiry"
              className="border-1 bg-gray w-full rounded-xl"
              // ref={inquiryRef}
            />
            {!calendarAtt.inT && (
              <button
                className="border-2 bg-blue-500 rounded-xl p-1 text-sm"
                onClick={inquiryHandler}
              >
                Submit Inquiry
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Attendance;
