"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { handlePaymentSuccess } from "@/actions/server/Stripe";

export default function PaymentSuccess() {
  const searchParams = useSearchParams();
  const [status, setStatus] = useState("loading");
  const [paymentData, setPaymentData] = useState(null);

  useEffect(() => {
    const session_id = searchParams.get("session_id");

    if (!session_id) {
      return;
    }

    const processPayment = async () => {
      try {
        const result = await handlePaymentSuccess(session_id);

        if (result.success) {
          setStatus("success");
          setPaymentData(result);
        } else {
          setStatus("error");
        }
      } catch (error) {
        console.error("Payment processing error:", error);
        setStatus("error");
      }
    };

    processPayment();
  }, [searchParams]);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="loading loading-spinner loading-lg text-primary"></div>
          <p className="mt-4 text-gray-600">Processing your payment...</p>
        </div>
      </div>
    );
  }

  if (status === "error" || !searchParams.get("session_id")) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-error mb-2">
            Payment Failed
          </h1>
          <p className="text-gray-600 mb-6">
            There was an issue processing your payment. Please try again.
          </p>
          <Link href="/" className="btn btn-primary">
            Go to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg
            className="w-8 h-8 text-green-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        <h1 className="text-2xl font-bold text-success mb-2">
          Payment Successful!
        </h1>
        <p className="text-gray-600 mb-6">
          Your booking has been confirmed. We will send you a confirmation email
          shortly.
        </p>

        {paymentData?.transactionId && (
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <p className="text-sm text-gray-500">Transaction ID</p>
            <p className="font-mono text-sm text-gray-800">
              {paymentData.transactionId}
            </p>
          </div>
        )}

        <div className="flex gap-3">
          <Link href="/my-bookings" className="btn btn-primary flex-1">
            View Bookings
          </Link>
          <Link href="/" className="btn btn-primary btn-outline flex-1">
            Go to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
