import { getService } from "@/actions/server/Service";
import React from "react";
import ServiceCard from "../cards/ServiceCard";

const LatestService = async () => {
  const data = await getService({});
  const services = data.services;
  const AllServices = services.slice(0, 4);
  const LatestServices = AllServices.sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
  );
  
  return (
    <section className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-primary mb-6">
            Latest Services
          </h2>
          <p className="text-neutral max-w-2xl mx-auto leading-relaxed">
            Explore our latest services, freshly added to deliver the best value and
            experience for your family's care needs.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {LatestServices.map((service) => (
            <ServiceCard key={service._id} service={service}></ServiceCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LatestService;