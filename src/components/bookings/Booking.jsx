import { getSingleService } from "@/actions/server/Service";

import BookingForm from "./BookingForm";

const ServiceBooking = async ({ params }) => {
  const { id } = await params;
  const service = await getSingleService(id);

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-gray-500">Service not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="w-11/12 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-semibold text-gray-800">
              Book {service.name}
            </h1>
            <p className="text-sm text-gray-500">
              Complete the form below to confirm your booking
            </p>
          </div>
        </div>

        {/* Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Booking Form */}
          <div className="lg:col-span-2">
            <BookingForm service={service} />
          </div>

          {/* Right: Service Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-white rounded-xl shadow-sm border p-6 space-y-4">
              <h2 className="text-lg font-semibold text-gray-800">
                Service Summary
              </h2>

              <div>
                <p className="text-sm text-gray-500">Service</p>
                <p className="font-medium text-gray-800">{service.name}</p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Description</p>
                <p className="text-sm text-gray-700">{service.description}</p>
              </div>

              <div className="border-t pt-4">
                <p className="text-sm text-gray-500">Booking Status</p>
                <p className="text-sm font-medium text-yellow-600">
                  Pending approval
                </p>
              </div>

              <p className="text-xs text-gray-400">
                You will be notified once your booking is approved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceBooking;
