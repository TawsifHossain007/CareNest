const BookingDetailsSkeleton = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      {/* Back link */}
      <div className="mb-6">
        <div className="skeleton h-4 w-40"></div>
      </div>

      {/* Page Card */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100">
        {/* Header */}
        <div className="border-b px-8 py-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="skeleton h-6 w-48 mb-2"></div>
            <div className="skeleton h-4 w-64"></div>
          </div>

          {/* Status badge */}
          <div className="skeleton h-8 w-28 rounded-full"></div>
        </div>

        {/* Content */}
        <div className="px-8 py-8 grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Booking Info */}
          <section>
            <div className="skeleton h-5 w-44 mb-6"></div>

            <div className="space-y-4">
              {[...Array(7)].map((_, i) => (
                <div key={i} className="flex justify-between gap-4">
                  <div className="skeleton h-4 w-32"></div>
                  <div className="skeleton h-4 w-48"></div>
                </div>
              ))}

              {/* Total cost */}
              <div className="border-t pt-4 mt-4">
                <div className="flex justify-between items-center">
                  <div className="skeleton h-4 w-24"></div>
                  <div className="skeleton h-6 w-20"></div>
                </div>
              </div>

              {/* Transaction ID */}
              <div className="flex justify-between gap-4 mt-4">
                <div className="skeleton h-4 w-32"></div>
                <div className="skeleton h-4 w-48"></div>
              </div>
            </div>
          </section>

          {/* Service Info */}
          <section className="bg-gray-50 rounded-2xl p-6">
            <div className="skeleton h-5 w-40 mb-6"></div>

            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="flex justify-between gap-4">
                  <div className="skeleton h-4 w-32"></div>
                  <div className="skeleton h-4 w-48"></div>
                </div>
              ))}
            </div>

            <div className="mt-6">
              <div className="skeleton h-12 w-full rounded-xl"></div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default BookingDetailsSkeleton;
