import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const isAuthenticated = localStorage.getItem("token");

  return (
    <div>
      <nav className="bg-gradient-to-r from-blue-500 via-slate-500 to-gray-800 border-gray-200 shadow-md dark:bg-gray-900">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link
            to="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img
              src="https://flowbite.com/docs/images/logo.svg"
              className="h-10 hover:rotate-6 transition-transform duration-300"
              alt="BBC Logo"
            />
            <span className="self-center text-2xl font-extrabold tracking-wide text-white dark:text-yellow-300">
              BBC News
            </span>
          </Link>

          <div className="flex md:order-2 items-center space-x-3 md:space-x-0 rtl:space-x-reverse">
            {isAuthenticated ? (
              <Link
                to="/create"
                className="bg-blue-700 hover:bg-blue-800 transition duration-300 text-white font-medium rounded-lg text-sm px-4 py-2 text-center shadow-lg shadow-blue-500/50"
              >
                +Create Article
              </Link>
            ) : (
              <div className="flex gap-3 animate-fade-in">
                <Link
                  to="/signup"
                  className="bg-green-600 hover:bg-green-700 transition duration-300 text-white font-medium rounded-lg text-sm px-4 py-2 shadow-lg shadow-green-500/50"
                >
                  ➕ Sign Up
                </Link>
                <Link
                  to="/login"
                  className="bg-blue-600 hover:bg-blue-700 transition duration-300 text-white font-medium rounded-lg text-sm px-4 py-2 shadow-lg shadow-blue-500/50"
                >
                  🔐 Login
                </Link>
              </div>
            )}

            <button
              data-collapse-toggle="navbar-cta"
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-white rounded-lg md:hidden hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 ml-3"
              aria-controls="navbar-cta"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-6 h-6"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
          </div>
        </div>
        
      </nav>
    </div>
  );
}
