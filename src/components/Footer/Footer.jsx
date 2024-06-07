import React from "react";
import { FaFacebook, FaGithub, FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="relative bg-gray-100 text-black pt-8 pb-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap text-left lg:text-left">
          <div className="w-full lg:w-6/12 px-4">
            <h4 className="text-3xl fonat-semibold text-blueGray-700">
              Let's Keep Connect!
            </h4>
            <h5 className="text-lg mt-0 mb-2 text-blueGray-600">
              Find us on any of these platforms, we respond 1-2 working days.
            </h5>
            <div className="mt-6 lg:mb-0 mb-6 flex">
              <Link
                to={"https://x.com/MahmudAl29815"}
                className="flex bg-white text-blue-400 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2"
                target={"__blank"}
              >
                <FaTwitter className="text-xl" />
              </Link>
              <Link
                to={"https://www.facebook.com/hasan.almahmud.101"}
                className="flex bg-white text-blue-600 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2"
                type="button"
                target={"__blank"}
              >
                <FaFacebook className="text-xl" />
              </Link>

              <Link
                to={"https://github.com/huntermahmud"}
                className="flex bg-white text-gray-800 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2"
                type="button"
                target={"__blank"}
              >
                <FaGithub className="text-xl" />
              </Link>
            </div>
          </div>
          <div className="w-full lg:w-6/12 px-4">
            <div className="flex flex-wrap items-top mb-6">
              <div className="w-full lg:w-4/12 px-4 ml-auto">
                <span className="block uppercase text-blueGray-500 font-bold mb-2">
                  Useful Links
                </span>
                <ul className="list-unstyled">
                  <li>
                    <a
                      className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm"
                      href="#"
                    >
                      About Us
                    </a>
                  </li>
                  <li>
                    <a
                      className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm"
                      href="#"
                    >
                      Blog
                    </a>
                  </li>
                  <li>
                    <a
                      className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm"
                      href="#"
                    >
                      Github
                    </a>
                  </li>
                  
                </ul>
              </div>
              <div className="w-full lg:w-4/12 px-4">
                <h3 className="block uppercase text-blueGray-500  font-bold mb-2">
                  Contact Info
                </h3>

                <p className="font-semibold block pb-2 text-sm">
                  Address: Motihar, Rajshahi
                </p>
                <p className="font-semibold block pb-2 text-sm">
                  Phone: +8801798120845
                </p>

              </div>
            </div>
          </div>
        </div>
        <hr className="my-6 border-blueGray-300" />
        <div className="flex flex-wrap items-center md:justify-between justify-center">
          <div className="w-full md:w-4/12 px-4 mx-auto text-center">
            <div className="text-sm font-semibold py-1">
              Copyright © ThriveFit 2024 All Right Reserved
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
