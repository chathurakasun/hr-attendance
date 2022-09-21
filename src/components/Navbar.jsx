import React from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { RiNotification3Line } from "react-icons/ri";

import { CgLogOff } from "react-icons/cg";
import { MdKeyboardArrowDown } from "react-icons/md";
import avatar from "../data/avatar.jpg";

import { useAuthContext } from "../context/auth-context";
import { Link } from "react-router-dom";

// TooltipComponent alternative: <> </>

//-----------------------------------------------------------------
const Navbar = () => {
  const { setActiveMenu, isLoggedIn, logoutHandler, userName } =
    useAuthContext();
  console.log("isLoggedIN ", isLoggedIn);

  return (
    <div className="flex justify-between p-2 md:mx-6 relative">
      {/* Nav open/close button */}
      <>
        <button
          type="button"
          onClick={() => setActiveMenu((prevActiveMenu) => !prevActiveMenu)}
          style={{ color: "rgb(5 150 105)" }}
          className="relative text-xl rounded-full p-3 hover:bg-light-gray "
        >
          <span className="absolute inline-flex rounded-full h-2 w-2 right-2 top-2" />
          {<AiOutlineMenu />}
        </button>
      </>

      {/* all the nav items */}
      <div className="flex gap-4 mx-4">
        {/* notification */}
        <>
          <button
            style={{ color: "rgb(5 150 105)" }}
            className="relative text-xl rounded-full p-3 hover:bg-light-gray"
          >
            <RiNotification3Line />
          </button>
        </>

        {/* SignsIn */}
        {!isLoggedIn && (
          <>
            <Link to="/signin">
              <button className="border-emerald-600 bg-emerald-300 rounded-xl p-2 mt-1 text-sm">
                Sign IN
              </button>
            </Link>
          </>
        )}

        {/* Signup */}
        {!isLoggedIn && (
          <>
            <Link to="/signup">
              <button className="border-1 border-orange-500 rounded-xl p-2 mt-1 text-sm">
                Register
              </button>
            </Link>
          </>
        )}

        {/* Logout */}
        {isLoggedIn && (
          <>
            <Link to="/">
              <button
                className="border-1 border-emerald-600 rounded-xl p-2 mt-1 text-sm"
                onClick={logoutHandler}
              >
                <CgLogOff />
              </button>
            </Link>
          </>
        )}

        {/* profile */}
        {isLoggedIn && (
          <>
            <div className="flex items-center gap-2 cursor-pointer p-1 hover:bg-light-gray rounded-lg">
              <img
                alt="user profile avatar"
                src={avatar}
                className="rounded-full w-8 h-8"
              />
              <p>
                <span className="text-gray-400 text-14">Hi, </span>{" "}
                <span className="text-gray-400 font-bold ml-1 text-14">
                  {userName}{" "}
                </span>
              </p>
              <MdKeyboardArrowDown className="text-gray-400 text-14" />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
