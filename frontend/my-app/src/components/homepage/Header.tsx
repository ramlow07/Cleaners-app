import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-white shadow-md py-4">
      <div className="container mx-auto flex justify-center">
        <nav>
          <ul className="flex space-x-10 text-lg font-medium">
            <li>
              <Link
                to="/home"
                className="relative px-4 py-2 text-green-900 after:block after:h-[2px] after:w-0 after:bg-green-500 after:transition-all after:duration-300 hover:after:w-full"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/register"
                className="relative px-4 py-2 text-green-900 after:block after:h-[2px] after:w-0 after:bg-green-500 after:transition-all after:duration-300 hover:after:w-full"
              >
                Register
              </Link>
            </li>
            <li>
              <Link
                to="/login"
                className="relative px-4 py-2 text-green-900 after:block after:h-[2px] after:w-0 after:bg-green-500 after:transition-all after:duration-300 hover:after:w-full"
              >
                Login
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
