import React, { useState } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import useRole from "./../hooks/useRole";
import useAuthProvider from "./../hooks/useAuthProvider";
import { toast } from "react-toastify";
import { FaListCheck } from "react-icons/fa6";
import {
  FaBook,
  FaChalkboardTeacher,
  FaEdit,
  FaHome,
  FaMoneyCheckAlt,
  FaRegNewspaper,
  FaUserClock,
  FaUserEdit,
} from "react-icons/fa";
import { RxActivityLog } from "react-icons/rx";
import { IoIosLogOut } from "react-icons/io";
import {
  MdAddToPhotos,
  MdEditNote,
  MdFormatListBulletedAdd,
  MdManageAccounts,
  MdManageHistory,
  MdPostAdd,
} from "react-icons/md";

const Dashboard = () => {
  const { logOut } = useAuthProvider();
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

  if (roleLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <div
        className={`fixed lg:relative z-20 w-64 h-screen bg-white shadow-lg lg:shadow-none lg:flex lg:flex-col ${
          isSidebarOpen ? "block" : "hidden"
        }`}
      >
        <div className="flex items-center justify-between p-4 py-[22px] border-b border-gray-200">
          <h2 className="text-lg text-gray-800 font-semibold">
            ThriveFit Dashboard
          </h2>
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
        <nav className="flex flex-col justify-between flex-grow p-4 h-full bg-gray-100 overflow-y-auto">
          <ul>
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
                  <span className="flex gap-2 items-center"><FaRegNewspaper className="text-xl"/>   All NewsLetter  </span>
        
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
                  <span className="flex gap-2 items-center"><FaListCheck className="text-xl"/>   All Trainers  </span>
                  
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
                  <span className="flex gap-2 items-center"><FaUserClock className="text-xl"/>   Applied Trainers  </span>
                    
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
                  <span className="flex gap-2 items-center"><FaMoneyCheckAlt className="text-xl"/> Balance    </span>
                    
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
                     <span className="flex gap-2 items-center"><MdFormatListBulletedAdd className="text-xl"/>   Add New Class   </span>
                    
                  </NavLink>
                </li>
              </>
            )}
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
                    <span className="flex gap-2 items-center">
                      <FaEdit className="text-xl" /> Manage Slots{" "}
                    </span>
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
                    <span className="flex gap-2 items-center">
                      <MdAddToPhotos className="text-xl" /> Add New Slot{" "}
                    </span>
                  </NavLink>
                </li>
              </>
            )}
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
                  <span className="flex gap-2 items-center">
                    <MdPostAdd className="text-xl" /> Add New Forum{" "}
                  </span>
                </NavLink>
              </li>
            )}
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
                    <span className="flex gap-2 items-center">
                      <FaUserEdit className="text-xl" /> User Profile
                    </span>
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
                    <span className="flex gap-2 items-center">
                      <RxActivityLog className="text-xl" /> Activity Log
                    </span>
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
                    <span className="flex gap-2 items-center">
                      <FaChalkboardTeacher className="text-xl" /> Be A Trainer{" "}
                    </span>
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
                    <span className="flex gap-2 items-center">
                      <FaBook className="text-xl" /> Booked Trainer{" "}
                    </span>
                  </NavLink>
                </li>
              </>
            )}
          </ul>

          <ul className="hidden lg:block">
            <li>
              <Link
                to="/"
                className="block p-2 mb-2 text-gray-700 rounded hover:bg-blue-500 hover:text-white"
              >
                <span className="flex gap-2 items-center">
                  <FaHome className="text-xl" /> Home{" "}
                </span>
              </Link>
            </li>
            <li>
              <button
                onClick={handleLogOut}
                className="w-full text-left block p-2 mb-2 text-gray-700 rounded hover:bg-red-500 hover:text-white"
              >
                <span className="flex gap-2 items-center">
                  <IoIosLogOut className="text-xl" /> Logout{" "}
                </span>
              </button>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-auto">
        <header className="flex items-center justify-between bg-white p-4 border-b border-gray-200 lg:hidden">
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
          <div className="flex items-center justify-center gap-3">
            <Link
              to="/"
              className="block p-2 mb-2 rounded bg-blue-500 text-white"
            >
              Home
            </Link>

            <button
              onClick={handleLogOut}
              className=" text-left block p-2 mb-2 rounded bg-red-500 text-white"
            >
              Logout
            </button>
          </div>
        </header>
        <main className="flex-grow p-4 bg-gray-100 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
