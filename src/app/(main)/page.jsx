import About from "@/components/home/About";
import Banner from "@/components/home/Banner";
import CTA from "@/components/home/CTA";
import Experts from "@/components/home/Experts";
import FAQ from "@/components/home/FAQ";
import FeaturedServices from "@/components/home/FeaturedServices";
import LatestService from "@/components/home/LatestService";
import Overview from "@/components/home/Overview";
import Testimonials from "@/components/home/Testimonials";

export default async function Home() {
  return (
    <div className="space-y-24">
      <Banner />
      <About />
      <Overview />
      <FeaturedServices />
      <LatestService />
      <Experts />
      <Testimonials />
      <FAQ />
      <CTA />
    </div>
  );
}
