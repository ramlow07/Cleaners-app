import React from "react";

interface Benefit {
  title: string;
  description: string;
}

const BenefitsSection: React.FC = () => {
  const benefitprops: Benefit[] = [
    {
      title: "Save Time for What Matters",
      description:
        "Spend your time on things you love while we handle the cleaning.",
    },
  ];

  return (
    <section className="bg-white py-16 px-6">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-900">
          There are a thousand reasons to choose us.
        </h2>
        <p className="mt-3 text-gray-700 text-lg">
          And these are some of them:
        </p>
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {[
            {
              title: "Save time and reduce stress.",
              subtitle:
                "Your family needs your time more than everything. Save your time hiring a cleaner.",
            },
            {
              title: "Professional-Level Cleaning",
              subtitle:
                "Our cleaners have the right tools, expertise and products. Let them make the dirty work.",
            },
            {
              title: "Improves Health & Hygiene",
              subtitle:
                "Create a healthier environment to you and your family avoiding dirty, allergens and bacterias.",
            },
          ].map((testimonial, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200 transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
            >
              <p className="text-gray-800 text-lg">"{testimonial.title}"</p>
              <p className="mt-4 text-sm text-gray-600 font-medium">
                {testimonial.subtitle}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
