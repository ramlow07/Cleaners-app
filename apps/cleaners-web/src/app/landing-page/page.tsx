import React from "react";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center border border-solid text-center py-20 px-6 bg-blue-600 text-white">
        <h1 className="text-4xl font-bold mb-4">Cleaners App</h1>
        <p className="text-lg mb-6 max-w-xl">
          Find professional and reliable cleaners for your home or office with
          just a few clicks.
        </p>
        <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold shadow-lg hover:bg-gray-200">
          Get Started
        </button>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 grid md:grid-cols-3 gap-8 container mx-auto">
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <h2 className="text-2xl font-bold mb-2">Verified Cleaners</h2>
          <p>All our professionals are background-checked and highly rated.</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <h2 className="text-2xl font-bold mb-2">Easy Booking</h2>
          <p>
            Book a cleaner in minutes through our simple and intuitive platform.
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <h2 className="text-2xl font-bold mb-2">Affordable Pricing</h2>
          <p>Choose from flexible plans that fit your budget.</p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center py-20 bg-blue-600 text-white">
        <h2 className="text-3xl font-bold mb-4">
          Start Hiring Cleaners Today!
        </h2>
        <p className="mb-6">
          Sign up and get your first cleaning appointment booked now.
        </p>
        <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold shadow-lg hover:bg-gray-200">
          Sign Up Now
        </button>
      </section>
    </div>
  );
};

export default LandingPage;
