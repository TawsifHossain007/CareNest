import { GetBookingById } from "@/actions/server/Booking";
import { getSingleService } from "@/actions/server/Service";
import Link from "next/link";
import { notFound } from "next/navigation";

const BookingDetails = async ({ params }) => {
  // Await params in case it's a promise (Next.js 15+)
  const resolvedParams = await params;
  const { id } = resolvedParams;

  if (!id) {
    console.log("No ID provided");
    notFound();
  }

  const InfoRow = ({ label, value }) => (
    <div className="flex justify-between gap-4">
      <span className="text-gray-500 font-medium">{label}</span>
      <span className="text-gray-900 text-right wrap-break-words">{value}</span>
    </div>
  );

  try {
    const booking = await GetBookingById(id);
    if (!booking) {
      console.log("Booking not found for ID:", id);
      notFound();
    }

    // Get service details using the serviceId from booking
    let service = null;
    if (booking.serviceId) {
      service = await getSingleService(booking.serviceId);
    }

    return (
      <div className="max-w-5xl mx-auto px-4 py-10">
        {/* Back */}
        <div className="mb-6">
          <Link
            href="/my-bookings"
            className="inline-flex items-center text-sm font-medium text-primary hover:underline"
          >
            ← Back to My Bookings
          </Link>
        </div>

        {/* Page Card */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100">
          {/* Header */}
          <div className="border-b px-8 py-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Booking Details
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                Review your service booking information
              </p>
            </div>

            <span
              className={`inline-flex items-center px-4 py-1.5 rounded-full text-sm font-semibold capitalize
          ${
            booking.status === "confirmed"
              ? "bg-green-100 text-green-700"
              : booking.status === "pending"
                ? "bg-yellow-100 text-yellow-700"
                : "bg-red-100 text-red-700"
          }`}
            >
              {booking.status}
            </span>
          </div>

          {/* Content */}
          <div className="px-8 py-8 grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Booking Info */}
            <section>
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Booking Information
              </h2>

              <div className="space-y-4 text-sm">
                <InfoRow label="Booking ID" value={booking._id.toString()} />
                <InfoRow label="Service" value={booking.serviceName} />
                <InfoRow
                  label="Duration"
                  value={`${booking.durationValue} ${booking.durationType}(s)`}
                />
                <InfoRow
                  label="Service Date"
                  value={
                    booking.serviceDate
                      ? new Date(booking.serviceDate).toLocaleDateString()
                      : "Not specified"
                  }
                />
                <InfoRow
                  label="Location"
                  value={`${booking.location.division}, ${booking.location.district}`}
                />
                <InfoRow label="Address" value={booking.location.address} />
                <InfoRow
                  label="Booking Date"
                  value={new Date(booking.bookingDate).toLocaleDateString()}
                />

                <div className="border-t pt-4 mt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Total Cost</span>
                    <span className="text-xl font-bold text-gray-900">
                      ৳{booking.totalCost}
                    </span>
                  </div>
                </div>

                <InfoRow
                  label="Transaction ID"
                  value={booking.transactionId || "—"}
                />
              </div>
            </section>

            {/* Service Info */}
            {service && service._id && (
              <section className="bg-gray-50 rounded-2xl p-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">
                  Service Details
                </h2>

                <div className="space-y-4 text-sm">
                  <InfoRow label="Service Name" value={service.name} />
                  <InfoRow label="Category" value={service.category} />
                  <InfoRow label="Description" value={service.description} />
                  <InfoRow
                    label="Price per Hour"
                    value={`৳${service.pricePerHour}`}
                  />
                  <InfoRow
                    label="Price per Day"
                    value={`৳${service.pricePerDay}`}
                  />
                </div>

                <div className="mt-6">
                  <Link
                    href={`/services/${service._id}`}
                    className="inline-flex items-center mt-5 justify-center w-full rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white hover:bg-primary/90 transition"
                  >
                    View Full Service Details
                  </Link>
                </div>
              </section>
            )}
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error fetching booking details:", error);
    notFound();
  }
};

export default BookingDetails;
