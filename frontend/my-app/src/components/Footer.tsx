import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto text-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Your Company. All rights reserved.
        </p>
        <div className="mt-4 space-x-4">
          <a href="#" className="text-blue-400 hover:underline">
            Facebook
          </a>
          <a href="#" className="text-blue-400 hover:underline">
            Twitter
          </a>
          <a href="#" className="text-blue-400 hover:underline">
            Instagram
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
