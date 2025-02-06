import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-white shadow-md py-4">
      <div className="container mx-auto flex justify-center">
        <nav>
          <ul className="flex space-x-10 text-lg font-medium">
            <li>
              <Link to="/home" className="hover:text-green-500 transition">
                Home
              </Link>
            </li>
            <li>
              <Link to="/register" className="hover:text-green-500 transition">
                Register
              </Link>
            </li>
            <li>
              <Link to="/login" className="hover:text-green-500 transition">
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
