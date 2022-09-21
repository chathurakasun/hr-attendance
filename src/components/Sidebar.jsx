import React from "react";
import { Link, NavLink } from "react-router-dom";
import { GiPikeman } from "react-icons/gi";

import { links } from "../data/db";

import { useAuthContext } from "../context/auth-context";

const Sidebar = () => {
  const { activeMenu, setActiveMenu } = useAuthContext();

  const handleCloseSideBar = () => {
    setActiveMenu(false);
  };

  const activeLink =
    "flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-white text-md m-2";

  const normalLink =
    "flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-md text-gray-700 dark:text-gray-200 dark:hover:text-black hover:bg-light-gray m-2";
  return (
    <div className="ml-3 h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto pb-10">
      {activeMenu && (
        <>
          {/* sidebar header section */}
          <div className="flex justify-between items-center">
            {/* LOGO link */}
            <Link
              to="/"
              onClick={handleCloseSideBar}
              className="items-center gap-3 ml-3 mt-4 flex text-xl font-extrabold tracking-tight dark:text-white text-slate-900"
            >
              <GiPikeman /> <span>Best HR</span>
            </Link>
            {/* Cancel button */}
          </div>

          {/* Side bar ELEMENTS______________________________________________ */}
          <div className="mt-10">
            {links.map((item) => (
              <div key={item.title}>
                <p className="text-gray-400 m-3 mt-4 uppercase">{item.title}</p>
                {item.links.map((link) => (
                  <NavLink
                    to={`/${link.name}`}
                    key={link.name}
                    onClick={handleCloseSideBar}
                    style={({ isActive }) => ({
                      backgroundColor: isActive ? "blue" : "",
                    })}
                    className={({ isActive }) =>
                      isActive ? activeLink : normalLink
                    }
                  >
                    {link.icon}
                    <span className="capitalize">{link.name}</span>
                  </NavLink>
                ))}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Sidebar;
