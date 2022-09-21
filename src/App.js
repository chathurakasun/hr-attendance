import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Navbar, Sidebar } from "./components";
import {
  Dashboard,
  Attendance,
  Leave,
  Ot,
  Payroll,
  Permissions,
  Employees,
  Chat,
  Signin,
  Signup,
} from "./pages";

import { useAuthContext } from "./context/auth-context";

const App = () => {
  const { activeMenu, isLoggedIn } = useAuthContext();

  return (
    <BrowserRouter>
      <div className="flex relative dark:bg-main-dark-bg">
        {/* Left Side bar for menu */}
        {activeMenu ? (
          <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white">
            <Sidebar />
          </div>
        ) : (
          <div className="w-0 dark:bg-secondary-dark-bg">
            <Sidebar />
          </div>
        )}

        {/* rightSide page */}

        <div
          className={`dark:bg-main-dark-bg bg-main-bg min-h-screen w-full ${
            activeMenu ? "md:ml-72" : "flex-2"
          }`}
        >
          {/* Navigation Bar */}
          <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full">
            <Navbar />
          </div>

          {/* MainComponents */}
          <div>
            <Routes>
              {/* Dashboard */}
              <Route path="/" element={<Dashboard />} />
              <Route path="/dashboard" element={<Dashboard />} />

              {/* att data */}

              {isLoggedIn && (
                <Route path="/attendance" element={<Attendance />} />
              )}
              <Route path="/leave" element={<Leave />} />
              <Route path="/ot" element={<Ot />} />
              <Route path="/payroll" element={<Payroll />} />
              <Route path="/permissions" element={<Permissions />} />

              {/* Assets */}
              <Route path="/employees" element={<Employees />} />

              {/* Social */}
              <Route path="/chat" element={<Chat />} />

              {/* NavBar Pages */}
              <Route path="/signin" element={<Signin />} />
              <Route path="/signup" element={<Signup />} />
            </Routes>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
