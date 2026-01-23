"use client";
import React from "react";
import { useRouter } from "next/navigation";

const CTA = () => {
  const router = useRouter();

  const handleBookNow = () => {
    router.push("/services");
  };

  const handleLearnMore = () => {
    router.push("/about");
  }

  return (
    <section className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="bg-primary rounded-2xl text-white py-16 px-8 text-center relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary to-primary-focus opacity-90"></div>
          
          <div className="relative z-10 space-y-8">
            <h2 className="text-4xl font-bold text-white mb-6">
              Need Trusted Care at Home?
            </h2>
            <p className="text-white/90 text-lg max-w-2xl mx-auto leading-relaxed">
              Whether it's babysitting, elderly care, or special home care, we make
              it easy and safe to hire the right caretaker for your family.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
              <button
                onClick={handleBookNow}
                className="btn btn-secondary btn-lg text-white hover:btn-secondary-focus transition-all duration-300"
              >
                Book a Caretaker
              </button>

              <button 
                onClick={handleLearnMore} 
                className="btn btn-outline btn-lg border-white text-white hover:bg-white hover:text-primary hover:border-white transition-all duration-300"
              >
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;