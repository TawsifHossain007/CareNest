
export const paymentStripe = () => {
    
}
    
    app.post("/create-checkout-session", verifyFBToken, async (req, res) => {
      const paymentInfo = req.body;
      const session = await stripe.checkout.sessions.create({
        line_items: [
          {
            // Provide the exact Price ID (for example, price_1234) of the product you want to sell
            price_data: {
              currency: "bdt",
              product_data: {
                name: paymentInfo.subscriptionType + " Subscription",
              },
              unit_amount: parseInt(paymentInfo.amount * 100), // amount in cents
            },

            quantity: 1,
          },
        ],
        customer_email: paymentInfo.reporterEmail,
        mode: "payment",
        metadata: {
          reporterName: paymentInfo.reporterName,
          reporterEmail: paymentInfo.reporterEmail,
          subscriptionType: paymentInfo.subscriptionType,
        },
        success_url: `${process.env.SITE_DOMAIN}/dashboard/payment-success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.SITE_DOMAIN}/dashboard/payment-cancel`,
      });
      res.send({ url: session.url });
    });

    app.patch("/payment-success", verifyFBToken, async (req, res) => {
      const session_id = req.query.session_id;
      const session = await stripe.checkout.sessions.retrieve(session_id);

      const transactionId = session.payment_intent;

      const query = { transactionId: transactionId };
      const existingPayment = await paymentCollection.findOne(query);
      if (existingPayment) {
        return res.send({
          success: true,
          transactionId,
          message: "Payment already processed.",
        });
      }

      if (session.payment_status === "paid") {
        const email = session.metadata.reporterEmail;

        const query = { email: email };

        const updatedDOC = {
          $set: {
            status: "Premium",
          },
        };
        const result = await usersCollection.updateOne(query, updatedDOC);

        const paymentRecord = {
          amount: session.amount_total / 100,
          currency: session.currency,
          subscriptionType: session.metadata.subscriptionType,
          CustomerName: session.metadata.reporterName,
          CustomerEmail: session.metadata.reporterEmail,
          paymentDate: new Date(),
          transactionId: session.payment_intent,
          paymentStatus: session.payment_status,
        };

        const resultPayment = await paymentCollection.insertOne(paymentRecord);

        return res.send({
          success: true,
          modifyProfile: result,
          transactionId: session.payment_intent,
          paymentInfo: resultPayment,
        });
      }
      return res.send({ success: false });
    });
