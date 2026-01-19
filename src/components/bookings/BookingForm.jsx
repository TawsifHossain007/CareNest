"use client";

import { useState, useMemo } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import CancelButton from "../buttons/CancelButton";
import { createCheckoutSession } from "@/actions/server/Stripe";

// Dummy district list (replace later with real data / API)
const DISTRICTS = [
  "Dhaka",
  "Chattogram",
  "Sylhet",
  "Khulna",
  "Rajshahi",
  "Barishal",
  "Rangpur",
  "Mymensingh",
];

const BookingForm = ({ service }) => {
  const { data: session } = useSession();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  // Duration
  const [durationType, setDurationType] = useState("hour"); // hour | day
  const [durationValue, setDurationValue] = useState(1);

  // Service Date
  const [serviceDate, setServiceDate] = useState("");

  // Location
  const [location, setLocation] = useState({
    division: "",
    district: "",
    city: "",
    address: "",
  });

  const pricePerHour = service?.pricePerHour || 0;
  const pricePerDay = service?.pricePerDay || 0;

  const totalCost = useMemo(() => {
    if (!durationValue || durationValue <= 0) return 0;
    return durationType === "hour"
      ? durationValue * pricePerHour
      : durationValue * pricePerDay;
  }, [durationType, durationValue, pricePerHour, pricePerDay]);

  const isFormValid =
    durationValue > 0 &&
    serviceDate &&
    location.division &&
    location.district &&
    location.address;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!session?.user) {
      Swal.fire("Login Required", "Please login to book a service", "warning");
      router.push("/login");
      return;
    }

    setIsLoading(true);

    const bookingData = {
      serviceId: service._id,
      serviceName: service.name,
      customerName: session.user.name,
      customerEmail: session.user.email,
      durationType,
      durationValue,
      serviceDate,
      location,
      totalCost,
    };

    try {
      const result = await createCheckoutSession(bookingData);

      if (result?.url) {
        window.location.href = result.url;
      } else {
        Swal.fire(
          "Error",
          result?.error || "Failed to create checkout session",
          "error",
        );
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Booking error:", error);
      Swal.fire("Error", "Something went wrong", "error");
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl shadow-md border border-gray-100 p-8 space-y-10"
    >
      {/* ================= Booking Details ================= */}
      <section>
        <h2 className="text-lg font-semibold text-gray-800 mb-1">
          Booking Details
        </h2>
        <p className="text-sm text-gray-500 mb-6">
          Select duration and service start date
        </p>

        {/* Duration Type */}
        <div className="inline-flex rounded-xl border bg-gray-50 p-1 mb-6">
          <button
            type="button"
            onClick={() => setDurationType("hour")}
            className={`px-5 py-2 rounded-lg text-sm font-medium transition ${
              durationType === "hour"
                ? "bg-primary text-white shadow"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            Per Hour
          </button>

          <button
            type="button"
            onClick={() => setDurationType("day")}
            className={`px-5 py-2 rounded-lg text-sm font-medium transition ${
              durationType === "day"
                ? "bg-primary text-white shadow"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            Per Day
          </button>
        </div>

        {/* Duration + Date */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-lg">
          {/* Duration */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Duration
            </label>
            <div className="flex items-center gap-3">
              <input
                type="number"
                min="1"
                value={durationValue}
                onChange={(e) => setDurationValue(Number(e.target.value))}
                className="w-28 border rounded-xl px-4 py-2 text-center focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <span className="text-sm text-gray-500">
                {durationType === "hour" ? "Hours" : "Days"}
              </span>
            </div>
          </div>

          {/* Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Service Start Date
            </label>
            <input
              type="date"
              value={serviceDate}
              onChange={(e) => setServiceDate(e.target.value)}
              min={new Date().toISOString().split("T")[0]}
              className="w-full border rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>
      </section>

      {/* ================= Location ================= */}
      <section className="bg-gray-50 rounded-2xl p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-1">
          Service Location
        </h2>
        <p className="text-sm text-gray-500 mb-6">
          Enter where the service will be provided
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Division
            </label>
            <input
              type="text"
              value={location.division}
              onChange={(e) =>
                setLocation({ ...location, division: e.target.value })
              }
              className="w-full border rounded-xl px-4 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              District
            </label>
            <select
              value={location.district}
              onChange={(e) =>
                setLocation({ ...location, district: e.target.value })
              }
              className="w-full border rounded-xl px-4 py-2 bg-white"
            >
              <option value="">Select District</option>
              {DISTRICTS.map((district) => (
                <option key={district} value={district}>
                  {district}
                </option>
              ))}
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              City (optional)
            </label>
            <input
              type="text"
              value={location.city}
              onChange={(e) =>
                setLocation({ ...location, city: e.target.value })
              }
              className="w-full border rounded-xl px-4 py-2"
            />
          </div>
        </div>

        <div className="mt-5">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Full Address
          </label>
          <textarea
            value={location.address}
            onChange={(e) =>
              setLocation({ ...location, address: e.target.value })
            }
            className="w-full border rounded-xl px-4 py-2 resize-none"
            rows={3}
          />
        </div>
      </section>

      {/* ================= Cost Summary ================= */}
      <section className="border-t pt-6">
        <div className="flex justify-between text-sm text-gray-600">
          <span>Rate</span>
          <span>৳{durationType === "hour" ? pricePerHour : pricePerDay}</span>
        </div>

        <div className="flex justify-between text-lg font-semibold text-gray-900 mt-2">
          <span>Total Cost</span>
          <span>৳{totalCost}</span>
        </div>
      </section>

      {/* ================= Actions ================= */}
      <div className="flex flex-col md:flex-row gap-4">
        <button
          type="submit"
          disabled={!isFormValid || isLoading}
          className={`flex-1 rounded-xl py-4 font-semibold transition ${
            isFormValid && !isLoading
              ? "bg-primary text-white hover:bg-primary/90"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          {isLoading ? "Processing..." : "Proceed to Payment"}
        </button>

        <CancelButton />
      </div>

      <p className="text-xs text-gray-400 text-center">
        Your booking will be saved as{" "}
        <span className="font-medium">Pending</span>
      </p>
    </form>
  );
};

export default BookingForm;
