import About from "@/components/home/About";
import Banner from "@/components/home/Banner";
import Overview from "@/components/home/Overview";
import Testimonials from "@/components/home/Testimonials";
import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";

export default async function Home() {
  const session = getServerSession(authOptions)
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
