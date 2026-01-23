import Image from "next/image";
import Link from "next/link";
import React from "react";

const ServiceCard = ({ service }) => {
  return (
    <div className="bg-base-100 shadow-lg rounded-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300">
      {/* Image */}
      <Image
        src={service.image}
        alt={service.name}
        className="w-full h-48 object-cover"
        width={400}
        height={350}
      />

      {/* Content */}
      <div className="p-5 flex flex-col justify-between min-h-[300px]">
        <div>
          {/* Category */}
          <span className="text-sm text-secondary font-semibold uppercase">
            {service.category}
          </span>

          {/* Service Name */}
          <h3 className="text-xl font-bold mt-1 text-secondary">
            {service.name}
          </h3>

          {/* Short Description */}
          <p className="text-gray-600 mt-2 text-sm">
            {service.shortDescription}
          </p>

          {/* Features */}
          <ul className="mt-3 space-y-1 text-gray-700 text-sm">
            {service.features.map((feature, index) => (
              <li key={index} className="flex items-center">
                <span className="w-2 h-2 bg-primary rounded-full inline-block mr-2 mt-1"></span>
                {feature}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-3 border-t border-gray-100">
          <div className="text-lg font-semibold text-primary">
            {service.pricePerHour} BDT/hr
          </div>

          <div className="flex gap-2">
            <Link href={`/services/${service._id}`}>
              <button className="btn btn-primary hover:bg-white hover:text-primary btn-sm">
                View Details
              </button>
            </Link>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
