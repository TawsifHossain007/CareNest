import React from 'react';

const loading = () => {
    return (
        <div className="bg-gray-50 animate-pulse">
      {/* Hero Skeleton */}
      <section className="bg-primary/80 py-20 px-6 text-center">
        <div className="h-10 w-2/3 mx-auto bg-white/30 rounded mb-6" />
        <div className="h-5 w-1/2 mx-auto bg-white/20 rounded" />
      </section>

      {/* Featured Blog Skeleton */}
      <section className="max-w-7xl mx-auto px-6 -mt-16 mb-20">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden md:flex">
          <div className="md:w-1/2 h-72 md:h-auto bg-gray-300" />

          <div className="p-8 md:w-1/2 space-y-4">
            <div className="h-4 w-32 bg-gray-300 rounded" />
            <div className="h-8 w-3/4 bg-gray-300 rounded" />
            <div className="h-4 w-full bg-gray-200 rounded" />
            <div className="h-4 w-5/6 bg-gray-200 rounded" />
            <div className="h-4 w-1/3 bg-gray-200 rounded" />
            <div className="h-10 w-40 bg-gray-300 rounded-lg mt-4" />
          </div>
        </div>
      </section>

      {/* Blog Grid Skeleton */}
      <section className="max-w-7xl mx-auto px-6 pb-24">
        <div className="h-8 w-64 bg-gray-300 rounded mx-auto mb-10" />

        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-xl shadow-md overflow-hidden"
            >
              <div className="h-56 bg-gray-300" />
              <div className="p-6 space-y-4">
                <div className="h-6 w-3/4 bg-gray-300 rounded" />
                <div className="h-4 w-full bg-gray-200 rounded" />
                <div className="h-4 w-5/6 bg-gray-200 rounded" />
                <div className="h-4 w-1/3 bg-gray-200 rounded" />
                <div className="h-10 w-32 bg-gray-300 rounded-lg mt-4" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer CTA Skeleton */}
      <section className="bg-primary/80 py-16 text-center px-6">
        <div className="h-8 w-2/3 mx-auto bg-white/30 rounded mb-4" />
        <div className="h-5 w-1/2 mx-auto bg-white/20 rounded mb-6" />
        <div className="h-10 w-48 mx-auto bg-white/30 rounded-lg" />
      </section>
    </div>
    );
};

export default loading;