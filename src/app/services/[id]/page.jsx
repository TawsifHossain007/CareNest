import { getSingleService } from "@/actions/server/Service";
import Image from "next/image";
import Link from "next/link";
import { FiCheckCircle, FiClock, FiDollarSign } from "react-icons/fi";

const ServiceDetails = async ({ params }) => {
  const { id } = await params;
  const service = await getSingleService(id);

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-gray-500">Service not found.</p>
      </div>
    );
  }

  const {
    name,
    category,
    pricePerHour,
    pricePerDay,
    shortDescription,
    description,
    features,
    image,
    slug,
  } = service;

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="w-11/12 max-w-7xl mx-auto space-y-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-800">{name}</h1>
          <p className="text-primary font-medium mt-2">{category}</p>
          <p className="text-gray-600 mt-4">{shortDescription}</p>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-stretch">
          {/* Image */}
          <div className="relative h-full rounded-2xl overflow-hidden shadow-md bg-white">
            <Image
              src={image}
              alt={name}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Details */}
          <div className="h-full bg-white rounded-2xl shadow-md p-8 flex flex-col justify-between">
            <div className="space-y-6">
              {/* Description */}
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Service Overview
                </h3>
                <p className="text-gray-600 leading-relaxed">{description}</p>
              </div>

              {/* Features */}
              {features?.length > 0 && (
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">
                    What’s Included
                  </h3>
                  <ul className="space-y-2">
                    {features.map((feature, index) => (
                      <li
                        key={index}
                        className="flex items-center gap-2 text-gray-600"
                      >
                        <FiCheckCircle className="text-primary" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Pricing */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-lg">
                  <FiClock className="text-primary text-xl" />
                  <div>
                    <p className="text-sm text-gray-500">Per Hour</p>
                    <p className="font-semibold text-gray-800">
                      ৳ {pricePerHour}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-lg">
                  <FiDollarSign className="text-primary text-xl" />
                  <div>
                    <p className="text-sm text-gray-500">Per Day</p>
                    <p className="font-semibold text-gray-800">
                      ৳ {pricePerDay}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA pinned at bottom */}
            <div className="pt-6">
              <Link href={`/services/${service._id}/booking`}>
                <button className="w-full bg-primary hover:bg-primary/90 text-white py-4 rounded-xl font-semibold text-lg transition">
                  Book This Service
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetails;
