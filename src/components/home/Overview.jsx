import React from "react";
import { FaBaby, FaUserNurse, FaProcedures } from "react-icons/fa";

const Overview = () => {
  const services = [
    {
      id: 1,
      title: "Baby Care",
      description:
        "Trusted caregivers to look after your little ones with love and safety.",
      icon: <FaBaby className="text-4xl text-blue-600 mb-4" />,
    },
    {
      id: 2,
      title: "Elderly Service",
      description:
        "Compassionate support for seniors to ensure comfort, care, and companionship.",
      icon: <FaUserNurse className="text-4xl text-green-600 mb-4" />,
    },
    {
      id: 3,
      title: "Sick People Service",
      description:
        "Professional caregivers to assist patients and ensure proper home care.",
      icon: <FaProcedures className="text-4xl text-red-600 mb-4" />,
    },
  ];

  return (
    <section className=" py-16 px-6 md:px-16">
      <div className="max-w-6xl mx-auto text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">Our Services</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          We provide trusted and reliable care services for your loved ones, ensuring comfort, safety, and peace of mind.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {services.map((service) => (
          <div
            key={service.id}
            className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition"
          >
            <div className="flex justify-center">{service.icon}</div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-2 text-center">
              {service.title}
            </h3>
            <p className="text-gray-600 text-center">{service.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Overview;
