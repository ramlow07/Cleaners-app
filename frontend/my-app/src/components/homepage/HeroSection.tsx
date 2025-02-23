import React from "react";

const HeroSection = () => {
  return (
    <section className="hero flex items-center justify-center min-h-screen bg-green-100 px-6">
      <div className="max-w-3xl text-center">
        <h1 className="text-black text-3xl sm:text-4xl md:text-5xl font-bold mb-4 leading-tight">
          If you want to save your time, better call the{" "}
          <span className="text-green-700">CLEANERS APP</span>.
        </h1>
        <p className="text-gray-700 text-lg sm:text-xl mb-6">
          Your better friend when the the time is short.
        </p>
        <div className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4 ">
          <a rel="stylesheet" href="/cleanerlist">
            <button className="bg-white text-gray-900 font-medium py-3 px-10 rounded-full shadow-lg hover:bg-green-300 transition duration-300">
              I want to hire a CLEANER.
            </button>
          </a>
          <a rel="stylesheet" href="/cleaner-register">
            <button className="bg-white text-gray-900 font-medium py-3 px-10 rounded-full shadow-lg hover:bg-green-300 transition duration-300">
              I want to offer my services.
            </button>
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
