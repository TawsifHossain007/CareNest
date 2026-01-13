import About from "@/components/home/About";
import Banner from "@/components/home/Banner";
import Overview from "@/components/home/Overview";
import Testimonials from "@/components/home/Testimonials";
import Image from "next/image";

export default function Home() {
  return (
   <div className="space-y-20">
      <section>
        <Banner></Banner>
      </section>
      <section>
        <About></About>
      </section>
      <section>
        <Overview></Overview>
      </section>
      <section>
        <Testimonials></Testimonials>
      </section>
    </div>
  );
}
