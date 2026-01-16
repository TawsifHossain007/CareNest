"use server";

import Stripe from "stripe";
import { collections, dbConnect } from "@/lib/dbConnect";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const createCheckoutSession = async (bookingData) => {
  try {
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: "bdt",
            product_data: {
              name: bookingData.serviceName,
              description: `${bookingData.durationType === "hour" ? "Hourly" : "Daily"} booking for ${bookingData.durationValue} ${bookingData.durationType}(s)`,
            },
            unit_amount: parseInt(bookingData.totalCost * 100), // Stripe uses smallest unit
          },
          quantity: 1,
        },
      ],
      customer_email: bookingData.customerEmail,
      mode: "payment",
      metadata: {
        serviceId: bookingData.serviceId,
        serviceName: bookingData.serviceName,
        customerName: bookingData.customerName,
        customerEmail: bookingData.customerEmail,
        durationType: bookingData.durationType,
        durationValue: bookingData.durationValue.toString(),
        location: JSON.stringify(bookingData.location),
        totalCost: bookingData.totalCost.toString(),
      },
      success_url: `${process.env.NEXTAUTH_URL}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXTAUTH_URL}/payment-cancel`,
    });

    return { url: session.url };
  } catch (error) {
    console.error("Stripe error:", error);
    return { error: "Payment session creation failed" };
  }
};

export const handlePaymentSuccess = async (session_id) => {
  if (!session_id) {
    return { success: false, message: "Session ID missing" };
  }

  try {
    // Retrieve Stripe session
    const session = await stripe.checkout.sessions.retrieve(session_id);

    if (!session) {
      return { success: false, message: "Invalid session" };
    }

    const transactionId = session.payment_intent;
    const paymentCollection = dbConnect(collections.PAYMENT);
    const bookingCollection = dbConnect(collections.BOOKING);

    // Prevent duplicate processing
    const existingPayment = await paymentCollection.findOne({ transactionId });

    if (existingPayment) {
      return {
        success: true,
        transactionId,
        message: "Payment already processed",
      };
    }

    // Process only if payment is successful
    if (session.payment_status !== "paid") {
      return { success: false, message: "Payment not completed" };
    }

    // Parse location from metadata
    const location = JSON.parse(session.metadata.location);

    // Save booking record
    const bookingRecord = {
      serviceId: session.metadata.serviceId,
      serviceName: session.metadata.serviceName,
      customerName: session.metadata.customerName,
      customerEmail: session.metadata.customerEmail,
      durationType: session.metadata.durationType,
      durationValue: parseInt(session.metadata.durationValue),
      location,
      totalCost: parseFloat(session.metadata.totalCost),
      status: "confirmed",
      transactionId,
      bookingDate: new Date(),
    };

    const bookingResult = await bookingCollection.insertOne(bookingRecord);

    // Save payment record
    const paymentRecord = {
      bookingId: bookingResult.insertedId.toString(),
      amount: session.amount_total / 100,
      currency: session.currency,
      serviceName: session.metadata.serviceName,
      customerName: session.metadata.customerName,
      customerEmail: session.metadata.customerEmail,
      paymentDate: new Date(),
      transactionId,
      paymentStatus: session.payment_status,
    };

    const paymentResult = await paymentCollection.insertOne(paymentRecord);

    return {
      success: true,
      transactionId,
      bookingId: bookingResult.insertedId.toString(),
      paymentId: paymentResult.insertedId.toString(),
    };
  } catch (error) {
    console.error("Payment success handler error:", error);
    return { success: false, message: "Failed to process payment" };
  }
};
