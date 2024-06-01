import { Link, NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect } from "react";
import useAuthProvider from "../../hooks/useAuthProvider";

const Navbar = () => {
  const { user, logOut } = useAuthProvider();
  useEffect(() => {
    
    document.querySelector("html").setAttribute("class", "dark");
  }, []);

  const links = (
    <>
      <li>
        <NavLink className="text-base sm:text-lg lg:text-sm" to="/">
          Home
        </NavLink>
      </li>
      <li>
        <NavLink className="text-base sm:text-lg lg:text-sm" to="/">
          All Trainer
        </NavLink>
      </li>
      <li>
        <NavLink className="text-base sm:text-lg lg:text-sm" to="/">
          All Classes
        </NavLink>
      </li>
      <li>
        <NavLink className="text-base sm:text-lg lg:text-sm" to="/">
          Forums
        </NavLink>
      </li>

      {user ? (
        <>
          <li>
            <NavLink
              className="text-base sm:text-lg lg:text-sm"
              to="/dashboard"
            >
              Dashboard
            </NavLink>
          </li>
         
         
        </>
      ):
      (<>
      </>)}
    </>
  );
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

  return (
    <div className="text-black dark:text-white bg-card dark:bg-gray-500">
      <div className="navbar sm:w-[97%] sm:mx-auto max-w-7xl">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-20 p-2 shadow text-gray-800 bg-gray-100 dark:bg-gray-800 dark:text-gray-100 rounded-box w-52 font-bugrasimo"
            >
              {links}
            </ul>
          </div>
          <Link
            to="/"
            className="flex items-center justify-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse font-Bebas font-extrabold text-white text-xl italic"
          >
            Thrive <span className="not-italic text-blue-400">Fit</span>
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal font-bugrasimo px-1 space-x-3">
            {links}
          </ul>
        </div>

        <div className="navbar-end">
          <div className="flex items-center gap-3">
            {user ? (
              <>
                
                <img
                  // style={{ display: window.innerWidth <= 541 ? 'block' : 'none' }}
                  referrerPolicy="no-referrer"
                  alt={user?.displayName ? user.displayName : "Name not found"}
                  title={user?.displayName ? user.displayName : "Name not set"}
                  className="w-12 h-12 rounded-full ring-2 ring-offset-4 dark:bg-gray-500 dark:ring-violet-600 dark:ring-offset-gray-100 hidden sm:block"
                  src={
                    user?.photoURL
                      ? user.photoURL
                      : "https://i.ibb.co/tJTV83n/user-image-not-found.jpg"
                  }
                />

                <button
                  onClick={handleLogOut}
                  className="btn font-bugrasimo btn-secondary bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-[#f04970] sm:text-lg text-white"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link to="/login">
                <button className="btn btn-primary bg-violet-700 text-xl text-white font-bugrasimo">
                  Login
                </button>
              </Link>
            )}
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;