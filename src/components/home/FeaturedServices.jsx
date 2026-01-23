import { getService } from "@/actions/server/Service";
import React from "react";
import ServiceCard from "../cards/ServiceCard";

const FeaturedServices = async () => {
  const data = await getService({});
  const services = data.services;
  const featuredServices = services.slice(0, 8);

  return (
    <section className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-primary mb-6">Featured Services</h2>
          <p className="text-neutral max-w-2xl mx-auto leading-relaxed">
            Discover our most popular and trusted care services, carefully selected to meet your family's needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredServices.map((service) => (
            <ServiceCard key={service._id} service={service}></ServiceCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedServices;