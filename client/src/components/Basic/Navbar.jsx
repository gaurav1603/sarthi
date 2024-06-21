// src/components/Navbar.js
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaChevronDown } from "react-icons/fa";
import { FiBox, FiFilm, FiPenTool } from "react-icons/fi"; // Example icons
// import pic from "/src/assets/Saarthi-transformed1.png";
import { useTheme } from "../providers/ThemeProvider";
import Logo from "./Logo";

const Navbar = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  const [isFeaturesOpen, setIsFeaturesOpen] = useState(false);
  const [isResourcesOpen, setIsResourcesOpen] = useState(false);

  useEffect(() => {
    const d = document.body;
    if (isDarkMode) {
      d.style.backgroundColor = "#0f2526";
      d.style.color = "white";
    } else {
      d.style.backgroundColor = "#fff";
      d.style.color = "#0D203D";
    }
  }, [isDarkMode]);

  return (
    <div className="max-w-full overflow-x-hidden">
      <div className="h-16 flex flex-col md:flex-row items-center justify-between mb-10 md:mb-6 lg:mb-4 xl:mb-2 text-xl w-full md:w-full mx-[-2px]">
        <div className="flex items-center ml-4 md:ml-8">
          <Logo />
        </div>
        <div className="flex flex-wrap items-center justify-center ml-4 md:ml-8 md:w-auto md:mr-4">
          <Link
            key="home"
            to="/"
            className="mx-10 hover:text-gray-700 transition duration-300"
          >
            Home
          </Link>
          <div>
            <button
              onClick={() => setIsFeaturesOpen(!isFeaturesOpen)}
              className="mx-4 md:mx-8 flex items-center hover:text-gray-700 transition duration-300">
            
              Features 
            </button> 
            {isFeaturesOpen && (
              <div className="">
                {/* <div className="hover:bg-gray-400 p-2 cursor-pointer flex items-center">
                  <FiBox className="mr-3" />
                  <div>
                    <p className="font-bold">Create & Integrate</p>
                    <p className="text-sm text-gray-600">Option A description</p>
                  </div>
                </div> */}
                {/* <div className="hover:bg-gray-200 p-2 cursor-pointer flex items-center">
                  <FiFilm className="mr-3" />
                  <div>
                    <p className="font-bold">Welcome Studio</p>
                    <p className="text-sm text-gray-600">Option B description</p>
                  </div>
                </div> */}
                {/* <div className="hover:bg-gray-200 p-2 cursor-pointer flex items-center">
                  <FiPenTool className="mr-3" />
                  <div>
                    <p className="font-bold">Content Creator</p>
                    <p className="text-sm text-gray-600">Option C description</p>
                  </div>
                </div> */}
                {/* <div className="hover:bg-gray-200 p-2 cursor-pointer flex items-center text-center">
                  <div>
                    <p className="font-bold ml-7">See all Features</p>
                  </div>
                </div> */}
                {/* <div className="hover:bg-gray-200 p-2 cursor-pointer flex items-center">
                  <div>
                    <p className="font-bold">Take the Interactive Tour</p>
                  </div>
                </div> */}
              </div>
            )}
          </div>
          <Link
            key="price"
            to="/pricing"
            className="mx-4 md:mx-10 hover:text-gray-700 transition duration-300"
          >
            Pricing
          </Link>
          <div>
            <button
              onClick={() => setIsResourcesOpen(!isResourcesOpen)}
              className="mx-4 md:mx-8 flex items-center hover:text-gray-700 transition duration-300"
            >
              Resources 
            </button>
            {isResourcesOpen && (
              <div className="">
                {/* <div className="hover:bg-gray-200 p-2 cursor-pointer flex items-center">
                  <FiBox className="mr-3" />
                  <div>
                    <p className="font-bold">Option A</p>
                    <p className="text-sm text-gray-600">Description A</p>
                  </div>
                </div> */}
                {/* <div className="hover:bg-gray-200 p-2 cursor-pointer flex items-center">
                  <FiFilm className="mr-3" />
                  <div>
                    <p className="font-bold">Option B</p>
                    <p className="text-sm text-gray-600">Description B</p>
                  </div>
                </div> */}
                {/* <div className="hover:bg-gray-200 p-2 cursor-pointer flex items-center">
                  <FiPenTool className="mr-3" />
                  <div>
                    <p className="font-bold">Option C</p>
                    <p className="text-sm text-gray-600">Description C</p>
                  </div>
                </div> */}
              </div>
            )}
          </div>
          <Link
            key="events"
            to="/events"
            className="mx-2 md:mx-4 hover:text-gray-700 transition duration-300"
          >
            Events
          </Link>
        </div>
        <div className="flex justify-center items-center ml-4 md:ml-9">
          <Link to="/Landing">
            <button className="hover:text-gray-700 transition duration-300">
              Login
            </button>
          </Link>
          <button
            className="toggle bg-black w-24 md:w-32 mx-4 md:mx-6 text-base h-8 rounded-2xl text-white hover:bg-slate-500 transition duration-300"
            onClick={toggleTheme}
          >
            {isDarkMode ? "Light" : "Dark"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;