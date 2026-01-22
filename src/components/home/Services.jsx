import ServiceCard from "../cards/ServiceCard";

const Service = ({ services }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
      {services.map(service => (
        <ServiceCard key={service._id} service={service} />
      ))}
    </div>
  );
};

export default Service;
