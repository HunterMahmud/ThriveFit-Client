import React, { useState } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import useRole from "./../hooks/useRole";
import useAuthProvider from "./../hooks/useAuthProvider";
import { toast } from 'react-toastify';

const Dashboard = () => {
  const {  logOut } = useAuthProvider();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const location = useLocation();
  const handleLogOut = () => {
    logOut()
      .then(() => {
        toast.success("Logged out.");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Logout error happened.");
      });
  };

  const isActive = (path) => location.pathname === path;
  const [userRole, roleLoading] = useRole();
  // console.log(userRole);

  if (roleLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }
  return (
    <div className="flex h-full min-h-screen max-w-[100vw]">
      {/* Sidebar */}
      <div
        className={`fixed lg:relative z-20 w-64 bg-white shadow-lg lg:shadow-none lg:block ${
          isSidebarOpen ? "block" : "hidden"
        } lg:flex lg:flex-col`}
      >
        <div className="flex items-center justify-between p-4 py-[22px] border-b border-gray-200">
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
        <nav className="flex-grow p-4 bg-gray-100">
          <ul>
            {/* admin only navlinks */}
            {userRole === "admin" && (
              <>
                <li>
                  <NavLink
                    className={`block p-2 mb-2 text-gray-700 rounded hover:bg-blue-500 hover:text-white ${
                      isActive("/dashboard/allnewsletter")
                        ? "bg-blue-600 text-white"
                        : ""
                    }`}
                    to="/dashboard/allnewsletter"
                  >
                    All NewsLetter
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className={`block p-2 mb-2 text-gray-700 rounded hover:bg-blue-500 hover:text-white ${
                      isActive("/dashboard/alltrainers")
                        ? "bg-blue-600 text-white"
                        : ""
                    }`}
                    to="/dashboard/alltrainers"
                  >
                    All Trainers
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className={`block p-2 mb-2 text-gray-700 rounded hover:bg-blue-500 hover:text-white ${
                      isActive("/dashboard/appliedtrainers")
                        ? "bg-blue-600 text-white"
                        : ""
                    }`}
                    to="/dashboard/appliedtrainers"
                  >
                    Applied Trainers
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className={`block p-2 mb-2 text-gray-700 rounded hover:bg-blue-500 hover:text-white ${
                      isActive("/dashboard/balance")
                        ? "bg-blue-600 text-white"
                        : ""
                    }`}
                    to="/dashboard/balance"
                  >
                    Balance
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className={`block p-2 mb-2 text-gray-700 rounded hover:bg-blue-500 hover:text-white ${
                      isActive("/dashboard/addnewclass")
                        ? "bg-blue-600 text-white"
                        : ""
                    }`}
                    to="/dashboard/addnewclass"
                  >
                    Add New Class
                  </NavLink>
                </li>
              </>
            )}
            {/* trainer only navlinks */}
            {userRole === "trainer" && (
              <>
                <li>
                  <NavLink
                    className={`block p-2 mb-2 text-gray-700 rounded hover:bg-blue-500 hover:text-white ${
                      isActive("/dashboard/manageslot")
                        ? "bg-blue-600 text-white"
                        : ""
                    }`}
                    to="/dashboard/manageslot"
                  >
                    Manage Slots
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className={`block p-2 mb-2 text-gray-700 rounded hover:bg-blue-500 hover:text-white ${
                      isActive("/dashboard/addnewslot")
                        ? "bg-blue-600 text-white"
                        : ""
                    }`}
                    to="/dashboard/addnewslot"
                  >
                    Add New Slot
                  </NavLink>
                </li>
              </>
            )}
            {/* admin and trainer both common route */}
            {(userRole == "admin" || userRole == "trainer") && (
              <li>
                <NavLink
                  className={`block p-2 mb-2 text-gray-700 rounded hover:bg-blue-500 hover:text-white ${
                    isActive("/dashboard/addnewforum")
                      ? "bg-blue-600 text-white"
                      : ""
                  }`}
                  to="/dashboard/addnewforum"
                >
                  Add New Forum
                </NavLink>
              </li>
            )}
            {/* member only navlinks */}
            {userRole === "member" && (
              <>
                <li>
                  <NavLink
                    className={`block p-2 mb-2 text-gray-700 rounded hover:bg-blue-500 hover:text-white ${
                      isActive("/dashboard/userprofile")
                        ? "bg-blue-600 text-white"
                        : ""
                    }`}
                    to="/dashboard/userprofile"
                  >
                    User Profile
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className={`block p-2 mb-2 text-gray-700 rounded hover:bg-blue-500 hover:text-white ${
                      isActive("/dashboard/activitylog")
                        ? "bg-blue-600 text-white"
                        : ""
                    }`}
                    to="/dashboard/activitylog"
                  >
                    Activity Log
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className={`block p-2 mb-2 text-gray-700 rounded hover:bg-blue-500 hover:text-white ${
                      isActive("/dashboard/beatrainer")
                        ? "bg-blue-600 text-white"
                        : ""
                    }`}
                    to="/dashboard/beatrainer"
                  >
                    Be A Trainer
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className={`block p-2 mb-2 text-gray-700 rounded hover:bg-blue-500 hover:text-white ${
                      isActive("/dashboard/bookedtrainer")
                        ? "bg-blue-600 text-white"
                        : ""
                    }`}
                    to="/dashboard/bookedtrainer"
                  >
                    Booked Trainer
                  </NavLink>
                </li>
                {/* <li>
                  <NavLink
                    className={`block p-2 mb-2 text-gray-700 rounded hover:bg-blue-500 hover:text-white ${
                      isActive("/dashboard/recommendedclasses")
                        ? "bg-blue-600 text-white"
                        : ""
                    }`}
                    to="/dashboard/recommendedclasses"
                  >
                    Recommended Classes
                  </NavLink>
                </li> */}
              </>
            )}
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
          <div className="flex justify-between w-full">
            <h1 className="text-xl font-semibold">Welcome to ThriveFit</h1>
            <div className="flex justify-center items-center gap-2">
              <NavLink to="/" className="bg-blue-500 p-2 rounded-md text-white">
                Home
              </NavLink>
              <button onClick={handleLogOut} className="bg-red-600 p-2 rounded-md text-white">
                Logout
              </button>
            </div>
          </div>
        </header>
        <main className="flex-grow bg-white max-w-[100vw] ">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
