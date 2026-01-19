import Link from "next/link";
import React from "react";

const About = () => {
  return (
    <section className=" py-16 px-6 md:px-16">
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
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            About Us
          </h2>
          <p className="text-gray-600 mb-4">
            At CareNest, our mission is to make caregiving simple, secure, and reliable. 
            We connect families with trusted professionals for child care, elderly care, 
            and special home services. Our platform ensures safety, convenience, and peace of mind.
          </p>
          <p className="text-gray-600 mb-6">
            Whether you need a babysitter, elderly caretaker, or special assistance at home, 
            we provide vetted caregivers ready to meet your family’s unique needs.
          </p>
          <Link href={'/blogs'} className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition">
            See Blogs
          </Link>
        </div>
      </div>
    </section>
  );
};

export default About;
