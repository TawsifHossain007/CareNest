const MyBookingsSkeleton = () => {
  return (
    <div>
      {/* Title skeleton */}
      <div className="skeleton h-10 w-56 mb-6"></div>

      <div className="overflow-x-auto mt-10">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>SL No.</th>
              <th>Service</th>
              <th>Duration</th>
              <th>Location</th>
              <th>Status</th>
              <th>Total Cost</th>
              <th>Transaction Id</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {[...Array(5)].map((_, index) => (
              <tr key={index}>
                <th>
                  <div className="skeleton h-4 w-6"></div>
                </th>

                <td>
                  <div className="skeleton h-4 w-28"></div>
                </td>

                <td>
                  <div className="skeleton h-4 w-24"></div>
                </td>

                <td>
                  <div className="skeleton h-4 w-20"></div>
                </td>

                <td>
                  <div className="skeleton h-6 w-20 rounded-full"></div>
                </td>

                <td>
                  <div className="skeleton h-4 w-16"></div>
                </td>

                <td>
                  <div className="skeleton h-4 w-32"></div>
                </td>

                <td className="flex gap-2">
                  <div className="skeleton h-10 w-10 rounded-md"></div>
                  <div className="skeleton h-10 w-10 rounded-md"></div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyBookingsSkeleton;
