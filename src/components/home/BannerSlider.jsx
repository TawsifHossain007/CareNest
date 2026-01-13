'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

const BannerSlider = ({ services = [] }) => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (services.length <= 1) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % services.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [services.length]);

  if (!services.length) return null;

  const service = services[current];

  return (
    <div className="relative h-[80vh] w-full overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="absolute inset-0"
        >
          {/* background */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${service.image})` }}
          />
          <div className="absolute inset-0 bg-black/60" />

          {/* content */}
          <div className="relative z-10 flex h-full items-center">
            <div className="max-w-6xl mx-auto px-6 text-white">
              <motion.h1
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-4xl md:text-6xl font-bold"
              >
                {service.name}
              </motion.h1>

              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="mt-5 max-w-2xl text-lg text-gray-200"
              >
                {service.shortDescription}
              </motion.p>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="mt-8 flex items-center gap-4"
              >
                <Link
                  href={`/services/${service.slug}`}
                  className="btn btn-primary rounded-full px-8"
                >
                  View Service
                </Link>
                <span className="text-lg font-semibold">
                  ৳{service.pricePerHour}/hour
                </span>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* dots */}
      {services.length > 1 && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
          {services.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-2 w-6 rounded-full transition-all ${
                current === i ? 'bg-white' : 'bg-white/40'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default BannerSlider;
