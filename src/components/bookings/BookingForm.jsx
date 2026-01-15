"use client";

import { useState, useMemo } from "react";
import CancelButton from "../buttons/CancelButton";

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
  const [durationType, setDurationType] = useState("hour"); // hour | day
  const [durationValue, setDurationValue] = useState(1);

  const [location, setLocation] = useState({
    division: "",
    district: "",
    city: "",
    address: "",
  });

  const pricePerHour = service?.pricePerHour;
  const pricePerDay = service?.pricePerDay;

  const totalCost = useMemo(() => {
    if (!durationValue || durationValue <= 0) return 0;
    return durationType === "hour"
      ? durationValue * pricePerHour
      : durationValue * pricePerDay;
  }, [durationType, durationValue, pricePerHour, pricePerDay]);

  const isFormValid =
    durationValue > 0 &&
    location.division &&
    location.district &&
    location.address;

  const handleSubmit = (e) => {
    e.preventDefault();

    const bookingData = {
      serviceId: service._id,
      durationType,
      durationValue,
      location,
      totalCost,
      status: "pending",
    };

    console.log("Booking Data:", bookingData);
    // TODO: send to backend
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-xl shadow-sm border p-6 space-y-8"
    >
      {/* ================= Duration Section ================= */}
      <div>
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Select Duration
        </h2>

        {/* Type Toggle */}
        <div className="inline-flex rounded-lg border bg-gray-50 p-1 mb-4">
          <button
            type="button"
            onClick={() => setDurationType("hour")}
            className={`px-4 py-2 rounded-md text-sm font-medium transition ${
              durationType === "hour"
                ? "bg-primary text-white"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            Per Hour
          </button>

          <button
            type="button"
            onClick={() => setDurationType("day")}
            className={`px-4 py-2 rounded-md text-sm font-medium transition ${
              durationType === "day"
                ? "bg-primary text-white"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            Per Day
          </button>
        </div>

        {/* Duration Input */}
        <div className="flex items-center gap-3 max-w-xs">
          <input
            type="number"
            min="1"
            value={durationValue}
            onChange={(e) => setDurationValue(Number(e.target.value))}
            className="w-24 border rounded-lg px-3 py-2 text-center focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <span className="text-sm text-gray-600">
            {durationType === "hour" ? "Hours" : "Days"}
          </span>
        </div>

        <p className="text-xs text-gray-400 mt-2">
          Minimum booking: 1 {durationType}
        </p>
      </div>

      {/* ================= Location Section ================= */}
      <div>
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Service Location
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Division */}
          <input
            type="text"
            placeholder="Division"
            value={location.division}
            onChange={(e) =>
              setLocation({ ...location, division: e.target.value })
            }
            className="border rounded-lg px-4 py-2"
          />

          {/* District Dropdown */}
          <select
            value={location.district}
            onChange={(e) =>
              setLocation({ ...location, district: e.target.value })
            }
            className="border rounded-lg px-4 py-2 bg-white text-gray-700"
          >
            <option value="">Select District</option>
            {DISTRICTS.map((district) => (
              <option key={district} value={district}>
                {district}
              </option>
            ))}
          </select>

          {/* City */}
          <input
            type="text"
            placeholder="City (optional)"
            value={location.city}
            onChange={(e) => setLocation({ ...location, city: e.target.value })}
            className="border rounded-lg px-4 py-2"
          />
        </div>

        {/* Address */}
        <textarea
          placeholder="Full Address"
          value={location.address}
          onChange={(e) =>
            setLocation({ ...location, address: e.target.value })
          }
          className="w-full mt-4 border rounded-lg px-4 py-2 resize-none"
          rows={3}
        />
      </div>

      {/* ================= Cost Section ================= */}
      <div className="border-t pt-6 space-y-2">
        <div className="flex justify-between text-sm text-gray-600">
          <span>Rate ({durationType === "hour" ? "Hourly" : "Daily"})</span>
          <span>৳{durationType === "hour" ? pricePerHour : pricePerDay}</span>
        </div>

        <div className="flex justify-between font-semibold text-gray-800">
          <span>Total Cost</span>
          <span>৳{totalCost}</span>
        </div>
      </div>

      {/* ================= Submit ================= */}
      <div className="flex flex-col md:flex-row items-center gap-3">
        <button
          type="submit"
          disabled={!isFormValid}
          className={`w-full btn py-6 rounded-lg font-medium transition flex-2 ${
            isFormValid
              ? "bg-primary text-white hover:bg-primary/90"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          Confirm Booking
        </button>
        <div className="w-full md:max-w-fit">
                  <CancelButton></CancelButton>

        </div>
      </div>

      <p className="text-xs text-gray-400 text-center">
        Your booking will be saved as{" "}
        <span className="font-medium">Pending</span>
      </p>
    </form>
  );
};

export default BookingForm;
