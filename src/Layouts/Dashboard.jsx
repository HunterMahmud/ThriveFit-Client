import React, { useState } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const location = useLocation();

  const isActive = (path) => location.pathname === path;
  const isAdmin = true;

  return (
    <div className="flex h-full min-h-screen max-w-[100vw]">
      {/* Sidebar */}
      <div
        className={`fixed lg:relative z-20 w-64 bg-white shadow-lg lg:shadow-none lg:block ${
          isSidebarOpen ? "block" : "hidden"
        } lg:flex lg:flex-col`}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold">ThriveFit Dashboard</h2>
          <button className="lg:hidden text-gray-600" onClick={toggleSidebar}>
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <nav className="flex-grow p-4">
          <ul>
            {/* admin only navlinks */}
            {isAdmin && (
              <>
                <li
                  className={`block p-2 mb-2 text-gray-700 rounded hover:bg-gray-200 ${
                    isActive("/dashboard/allnewsletter") ? "bg-gray-200" : ""
                  }`}
                >
                  <NavLink to="/dashboard/allnewsletter">
                    All NewsLetter
                  </NavLink>
                </li>
                <li
                  className={`block p-2 mb-2 text-gray-700 rounded hover:bg-gray-200 ${
                    isActive("/dashboard/alltrainers") ? "bg-gray-200" : ""
                  }`}
                >
                  <NavLink to="/dashboard/alltrainers">All Trainers</NavLink>
                </li>
                <li
                  className={`block p-2 mb-2 text-gray-700 rounded hover:bg-gray-200 ${
                    isActive("/dashboard/appliedtrainers") ? "bg-gray-200" : ""
                  }`}
                >
                  <NavLink to="/dashboard/appliedtrainers">
                    Applied Trainers
                  </NavLink>
                </li>
                <li
                  className={`block p-2 mb-2 text-gray-700 rounded hover:bg-gray-200 ${
                    isActive("/dashboard/balance") ? "bg-gray-200" : ""
                  }`}
                >
                  <NavLink to="/dashboard/balance">Balance</NavLink>
                </li>
                <li
                  className={`block p-2 mb-2 text-gray-700 rounded hover:bg-gray-200 ${
                    isActive("/dashboard/addnewclass") ? "bg-gray-200" : ""
                  }`}
                >
                  <NavLink to="/dashboard/addnewclass">Add New Class</NavLink>
                </li>
              </>
            )}
            {/* trainer only navlinks */}

            {/* member only navlinks */}
            <li
              className={`block p-2 mb-2 text-gray-700 rounded hover:bg-gray-200 ${
                isActive("/dashboard/bratrainer") ? "bg-gray-200" : ""
              }`}
            >
              <NavLink to="/dashboard/">add </NavLink>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col transition-all duration-300 ">
        <header className="flex items-center justify-between bg-white p-4 border-b border-gray-200">
          <button className="lg:hidden text-gray-600" onClick={toggleSidebar}>
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
          <h1 className="text-xl font-semibold">Welcome to ThriveFit</h1>
        </header>
        <main className="flex-grow bg-white max-w-[100vw] ">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
