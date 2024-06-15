import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from "../providers/ThemeProvider";

const Logo = () => {
  const { isDarkMode } = useTheme();

  return (
    <Link to="/" className="flex items-center ml-4 md:ml-8 hover:text-gray-700 transition duration-300 transform hover:scale-105">
      <h3 className={`font-bold text-3xl ${isDarkMode ? 'text-white' : 'text-blue-900'}`}>
        sarthi
      </h3>
    </Link>
  );
};

export default Logo;
