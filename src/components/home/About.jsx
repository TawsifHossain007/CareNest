import Link from "next/link";
import React from "react";

const About = () => {
  return (
    <section className="py-20 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12">
        
        {/* Image */}
        <div className="md:w-1/2">
          <img
            src="https://i.ibb.co.com/YB42Hrzw/medium-shot-latin-friends-hanging-out-23-2151139437.jpg"
            alt="About Us"
            className="rounded-xl shadow-lg w-full"
          />
        </div>

        {/* Text Content */}
        <div className="md:w-1/2">
          <h2 className="text-4xl font-bold text-primary mb-6">
            About Us
          </h2>
          <p className="text-neutral mb-4 leading-relaxed">
            At CareNest, our mission is to make caregiving simple, secure, and reliable. 
            We connect families with trusted professionals for child care, elderly care, 
            and special home services. Our platform ensures safety, convenience, and peace of mind.
          </p>
          <p className="text-neutral mb-8 leading-relaxed">
            Whether you need a babysitter, elderly caretaker, or special assistance at home, 
            we provide vetted caregivers ready to meet your family's unique needs.
          </p>
          <Link href={'/blogs'} className="btn btn-primary text-white px-8 py-3 rounded-lg hover:btn-primary-focus transition-all duration-300">
            See Blogs
          </Link>
        </div>
      </div>
    </section>
  );
};

export default About;