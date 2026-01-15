import React from 'react';

const loading = () => {
    return (
            <div className="min-h-screen bg-gray-50 py-10 animate-pulse">
      <div className="w-11/12 max-w-7xl mx-auto">
        {/* Header Skeleton */}
        <div className="mb-8 space-y-2">
          <div className="h-6 w-56 bg-gray-200 rounded"></div>
          <div className="h-4 w-80 bg-gray-200 rounded"></div>
        </div>

        {/* Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Booking Form Skeleton */}
          <div className="lg:col-span-2 bg-white rounded-xl border p-6 space-y-8">
            {/* Section title */}
            <div className="h-5 w-40 bg-gray-200 rounded"></div>

            {/* Duration buttons */}
            <div className="flex gap-3">
              <div className="h-9 w-24 bg-gray-200 rounded-lg"></div>
              <div className="h-9 w-24 bg-gray-200 rounded-lg"></div>
            </div>

            {/* Duration input */}
            <div className="h-10 w-32 bg-gray-200 rounded-lg"></div>

            {/* Location section */}
            <div className="space-y-4">
              <div className="h-5 w-44 bg-gray-200 rounded"></div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="h-10 bg-gray-200 rounded-lg"></div>
                <div className="h-10 bg-gray-200 rounded-lg"></div>
                <div className="h-10 bg-gray-200 rounded-lg"></div>
              </div>

              <div className="h-20 bg-gray-200 rounded-lg"></div>
            </div>

            {/* Cost section */}
            <div className="border-t pt-6 space-y-3">
              <div className="flex justify-between">
                <div className="h-4 w-32 bg-gray-200 rounded"></div>
                <div className="h-4 w-20 bg-gray-200 rounded"></div>
              </div>

              <div className="flex justify-between">
                <div className="h-5 w-32 bg-gray-200 rounded"></div>
                <div className="h-5 w-24 bg-gray-200 rounded"></div>
              </div>
            </div>

            {/* Button */}
            <div className="h-12 w-full bg-gray-200 rounded-lg"></div>
          </div>

          {/* Right: Service Summary Skeleton */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-white rounded-xl border p-6 space-y-4">
              <div className="h-5 w-40 bg-gray-200 rounded"></div>

              <div className="space-y-2">
                <div className="h-4 w-24 bg-gray-200 rounded"></div>
                <div className="h-5 w-48 bg-gray-200 rounded"></div>
              </div>

              <div className="space-y-2">
                <div className="h-4 w-28 bg-gray-200 rounded"></div>
                <div className="h-4 w-full bg-gray-200 rounded"></div>
                <div className="h-4 w-5/6 bg-gray-200 rounded"></div>
              </div>

              <div className="border-t pt-4 space-y-2">
                <div className="h-4 w-32 bg-gray-200 rounded"></div>
                <div className="h-4 w-40 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    );
};

export default loading;