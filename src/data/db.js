import React from "react";

//---------icons-------------------
import { MdSpaceDashboard } from "react-icons/md";
import { BiTime, BiChat, BiBox } from "react-icons/bi";
import { FaBusinessTime } from "react-icons/fa";
import { IoIosTimer } from "react-icons/io";
import { MdOutlineAttachMoney, MdAccessTimeFilled } from "react-icons/md";
import { AiOutlineMail } from "react-icons/ai";
import { IoMdContacts } from "react-icons/io";

import { BsPeopleFill } from "react-icons/bs";
import { FaRegCalendarTimes, FaUserTimes } from "react-icons/fa";

/////////////////////////////////////////
// export const FIREBASE_URL = https://hrm-cks-default-rtdb.asia-southeast1.firebasedatabase.app;

//////////SideBar Links/////////////////
export const links = [
  {
    title: "Overview",
    links: [
      {
        name: "dashboard",
        icon: <MdSpaceDashboard />,
      },
    ],
  },

  {
    title: "User Data",
    links: [
      {
        name: "attendance",
        icon: <BiTime />,
      },
      {
        name: "leave",
        icon: <FaBusinessTime />,
      },
      {
        name: "ot",
        icon: <IoIosTimer />,
      },
      {
        name: "payroll",
        icon: <MdOutlineAttachMoney />,
      },
      {
        name: "permissions",
        icon: <AiOutlineMail />,
      },
    ],
  },
  {
    title: "Assets",
    links: [
      {
        name: "employees",
        icon: <IoMdContacts />,
      },
    ],
  },
  {
    title: "Social",
    links: [
      {
        name: "Chat",
        icon: <BiChat />,
      },
    ],
  },
];

///////TODAy attendance all//////////////
export const todayStats = [
  {
    icon: <BsPeopleFill />,
    amount: "38",
    title: "Present",
  },
  {
    icon: <FaUserTimes />,
    amount: "2",
    title: "Absent",
  },
  {
    icon: <BiBox />,
    amount: "2",
    title: "Leaves",
  },
  {
    icon: <MdAccessTimeFilled />,
    amount: "1",
    title: "Pending Attendance",
  },
  {
    icon: <FaRegCalendarTimes />,
    amount: "0",
    title: "Offday",
  },
];
////////////////////////
///////leave breakdown//////////////
export const leaveBreakdown = [
  {
    amount: "12 days",
    title: "Annual",
  },
  {
    amount: "9 days",
    title: "Casual",
  },
  {
    amount: "2 days",
    title: "Compassionate",
  },
  {
    amount: "1 day",
    title: "Marriage",
  },
  {
    amount: "0 day",
    title: "Medical",
  },
  {
    amount: "1 day",
    title: "Paternity",
  },
];
