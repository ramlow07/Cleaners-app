import React from "react";
import { FaClock } from "react-icons/fa";
import { IconType } from "react-icons";

interface Benefit {
  title: string;
  description: string;
  icon: IconType;
}

const BenefitsSection: React.FC = () => {
  const benefitprops: Benefit[] = [
    {
      title: "Save Time for What Matters",
      description:
        "Spend your time on things you love while we handle the cleaning.",
      icon: FaClock,
    },
  ];

  return (
    <section className="benefits-section bg-gray-100 py-16">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold mb-8">Why Choose Our Services?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {benefitprops.map((benefits, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center"
            >
              <h3 className="text-xl font-semibold mb-2">{benefits.title}</h3>
              <p className="text-gray-600">{benefits.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
