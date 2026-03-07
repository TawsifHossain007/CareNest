const MyProfileSkeleton = () => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-8">
          <div className="skeleton h-8 w-48 mb-2 bg-blue-400"></div>
          <div className="skeleton h-4 w-64 bg-blue-400"></div>
        </div>

        {/* Profile Content */}
        <div className="p-6">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Profile Photo */}
            <div className="flex flex-col items-center">
              <div className="skeleton w-40 h-40 rounded-full"></div>
              <div className="skeleton h-6 w-20 mt-4 rounded-full"></div>
            </div>

            {/* Profile Information */}
            <div className="flex-1 space-y-6">
              {[...Array(6)].map((_, index) => (
                <div key={index}>
                  <div className="skeleton h-4 w-32 mb-2"></div>
                  <div className="skeleton h-12 w-full rounded-lg"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfileSkeleton;
