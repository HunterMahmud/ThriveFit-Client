import React, { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`fixed lg:relative z-20 w-64 bg-white shadow-lg lg:shadow-none lg:block ${
          isSidebarOpen ? 'block' : 'hidden'
        } lg:flex lg:flex-col`}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold">ThriveFit Dashboard</h2>
          <button
            className="lg:hidden text-gray-600"
            onClick={toggleSidebar}
          >
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
            <li className="mb-2">
              <NavLink to='/dashboard'>Dashboard</NavLink>
            </li>
            <li className="mb-2">
              <NavLink to='/dashboard/allnewsletter'>All NewsLetter</NavLink>
            </li>
            <li className="mb-2">
              <a href="#" className="block p-2 text-gray-700 rounded hover:bg-gray-200">Profile</a>
            </li>
            <li className="mb-2">
              <a href="#" className="block p-2 text-gray-700 rounded hover:bg-gray-200">Settings</a>
            </li>
            <li className="mb-2">
              <a href="#" className="block p-2 text-gray-700 rounded hover:bg-gray-200">Logout</a>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col transition-all duration-300">
        <header className="flex items-center justify-between bg-white p-4 border-b border-gray-200">
          <button
            className="lg:hidden text-gray-600"
            onClick={toggleSidebar}
          >
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
        <main className="flex-grow p-4">
          {/* Your main content goes here */}
          <h2 className="text-2xl font-semibold mb-4">Dashboard Content</h2>
          <Outlet/>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
