import { getService } from "@/actions/server/Service";
import BannerSlider from "./BannerSlider";

const Banner = async () => {
  const data = await getService({});
  const services = data.services;
  const activeServices = services?.filter((s) => s.isActive);

  // Convert MongoDB objects to plain objects
  const serializedServices = activeServices?.map(service => ({
    _id: service._id.toString(),
    name: service.name,
    slug: service.slug,
    category: service.category,
    pricePerHour: service.pricePerHour,
    pricePerDay: service.pricePerDay,
    shortDescription: service.shortDescription,
    description: service.description,
    features: service.features,
    image: service.image,
    isActive: service.isActive
  }));

  return <BannerSlider services={serializedServices} />;
};

export default Banner;