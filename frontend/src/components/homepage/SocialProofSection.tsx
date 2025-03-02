import React from "react";

const SocialProofSection = () => {
  return (
    <section className="bg-white py-16 px-6">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-900">
          Trusted by Thousands
        </h2>
        <p className="mt-3 text-gray-700 text-lg">
          Here's what people are saying about us:
        </p>
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {[
            { text: "This website is amazing!", author: "Happy Customer" },
            {
              text: "I can't believe how easy it is to use.",
              author: "Satisfied User",
            },
            { text: "Highly recommend to everyone!", author: "Loyal Client" },
          ].map((testimonial, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200 transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
            >
              <p className="text-gray-800 text-lg">"{testimonial.text}"</p>
              <p className="mt-4 text-sm text-gray-600 font-medium">
                - {testimonial.author}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SocialProofSection;
