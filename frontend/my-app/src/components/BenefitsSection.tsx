import React from "react";

interface Benefit {
  title: string;
  description: string;
}

const BenefitsSection: React.FC = () => {
  const benefits: Benefit[] = [
    {
      title: "Save Time for What Matters",
      description:
        "Spend your time on things you love while we handle the cleaning.",
    },
    {
      title: "Professional & Reliable",
      description:
        "Our cleaners are trained and vetted for top-quality service.",
    },
    {
      title: "Flexible Scheduling",
      description: "Book at your convenience, even on the same day.",
    },
    {
      title: "Eco-Friendly Cleaning",
      description: "Choose safe and sustainable cleaning products.",
    },
    {
      title: "Satisfaction Guaranteed",
      description: "We ensure your home is spotless, or we'll make it right.",
    },
  ];

  return (
    <section className="benefits-section bg-gray-100 py-16">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold mb-8">
          Why Choose Our Cleaning Services?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center"
            >
              <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
              <p className="text-gray-600">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
