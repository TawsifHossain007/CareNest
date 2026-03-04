import React from 'react';

const loading = () => {
    return (
          <div className="bg-gray-50 min-h-screen py-12 animate-pulse">
      <div className="w-11/12 max-w-7xl mx-auto space-y-10">
        
        {/* Header Skeleton */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="h-10 w-2/3 mx-auto bg-gray-200 rounded-lg"></div>
          <div className="h-4 w-32 mx-auto bg-gray-200 rounded"></div>
          <div className="h-4 w-full bg-gray-200 rounded"></div>
          <div className="h-4 w-5/6 mx-auto bg-gray-200 rounded"></div>
        </div>

        {/* Content Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-stretch">
          
          {/* Image Skeleton */}
          <div className="h-full rounded-2xl bg-gray-200 shadow-md"></div>

          {/* Details Skeleton */}
          <div className="h-full bg-white rounded-2xl shadow-md p-8 flex flex-col justify-between">
            
            <div className="space-y-6">
              {/* Overview */}
              <div>
                <div className="h-6 w-48 bg-gray-200 rounded mb-3"></div>
                <div className="space-y-2">
                  <div className="h-4 w-full bg-gray-200 rounded"></div>
                  <div className="h-4 w-11/12 bg-gray-200 rounded"></div>
                  <div className="h-4 w-10/12 bg-gray-200 rounded"></div>
                </div>
              </div>

              {/* Features */}
              <div>
                <div className="h-6 w-40 bg-gray-200 rounded mb-3"></div>
                <div className="space-y-2">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="h-4 w-3/4 bg-gray-200 rounded"
                    ></div>
                  ))}
                </div>
              </div>

              {/* Pricing */}
              <div className="grid grid-cols-2 gap-4">
                <div className="h-20 bg-gray-200 rounded-lg"></div>
                <div className="h-20 bg-gray-200 rounded-lg"></div>
              </div>
            </div>

            {/* CTA Skeleton */}
            <div className="pt-6 space-y-3">
              <div className="h-12 w-full bg-gray-200 rounded-xl"></div>
              <div className="h-3 w-2/3 mx-auto bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    );
};

export default loading;