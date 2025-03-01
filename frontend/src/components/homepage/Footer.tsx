import React from "react";

const quickLinks = ["About Us", "Services", "Contact", "Privacy Policy"];

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-8">
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          {/* Brand Info */}
          <div>
            <h2 className="text-xl font-bold text-white">Your Company</h2>
            <p className="mt-2 text-sm text-gray-400">
              Empowering businesses with cutting-edge solutions.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-white">Quick Links</h3>
            <ul className="space-y-1">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a href="#" className="hover:text-blue-400">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold text-white">Get in Touch</h3>
            <p className="mt-2 text-sm text-gray-400">
              Email: contact@yourcompany.com
            </p>
            <p className="text-sm text-gray-400">Phone: +1 (123) 456-7890</p>
          </div>
        </div>

        {/* Divider */}
        <hr className="my-6 border-gray-700" />

        {/* Copyright Section */}
        <p className="text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} Your Company. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
