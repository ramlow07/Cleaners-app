import React from "react";

const SocialProofSection = () => {
  return (
    <section className="bg-gray-100 py-12">
      <div className="container mx-auto text-center">
        <h2 className="text-2xl font-bold">Trusted by Thousands</h2>
        <p className="mt-2 text-gray-600">
          Here's what people are saying about us:
        </p>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <p>"This website is amazing!"</p>
            <p className="mt-2 text-sm text-gray-500">- Happy Customer</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <p>"I can't believe how easy it is to use."</p>
            <p className="mt-2 text-sm text-gray-500">- Satisfied User</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <p>"Highly recommend to everyone!"</p>
            <p className="mt-2 text-sm text-gray-500">- Loyal Client</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialProofSection;
