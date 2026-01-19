export const orderInvoiceTemplate = ({ 
  orderId, 
  customerName, 
  serviceName, 
  durationType, 
  durationValue, 
  location, 
  totalCost, 
  transactionId, 
  bookingDate 
}) => {
  return `
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f4; padding:20px; font-family:Arial;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff; padding:20px; border-radius:8px;">
          
          <!-- Header -->
          <tr>
            <td align="center" style="padding-bottom:20px;">
              <img src="https://i.ibb.co.com/fVhXLCm1/hands-holding-heart-2.png" width="120" />
              <h2 style="margin:10px 0;">🎉 Booking Confirmation</h2>
              <p style="color:#555;">Booking ID: <strong>${orderId}</strong></p>
              <p style="color:#555;">Transaction ID: <strong>${transactionId}</strong></p>
            </td>
          </tr>

          <!-- Customer Info -->
          <tr>
            <td style="padding-bottom:20px;">
              <h3 style="color:#333; margin-bottom:10px;">Customer Details</h3>
              <p style="margin:5px 0;"><strong>Name:</strong> ${customerName}</p>
              <p style="margin:5px 0;"><strong>Booking Date:</strong> ${new Date(bookingDate).toLocaleDateString()}</p>
            </td>
          </tr>

          <!-- Service Details -->
          <tr>
            <td>
              <table width="100%" border="1" cellspacing="0" cellpadding="12" style="border-collapse:collapse; margin-bottom:20px;">
                <thead>
                  <tr style="background:#f0f0f0;">
                    <th align="left">Service Details</th>
                    <th align="right">Information</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>Service Name</strong></td>
                    <td align="right">${serviceName}</td>
                  </tr>
                  <tr>
                    <td><strong>Duration</strong></td>
                    <td align="right">${durationValue} ${durationType}${durationValue > 1 ? 's' : ''}</td>
                  </tr>
                  <tr>
                    <td><strong>Location</strong></td>
                    <td align="right">${location.division}${location.district ? ', ' + location.district : ''}</td>
                  </tr>
                  <tr style="background:#f9f9f9;">
                    <td><strong>Total Cost</strong></td>
                    <td align="right"><strong>৳${totalCost}</strong></td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>

          <!-- Status -->
          <tr>
            <td align="center" style="padding:20px; background:#e8f5e8; border-radius:5px; margin-bottom:20px;">
              <h3 style="color:#2d5a2d; margin:0;">✅ Booking Status: Pending</h3>
              <p style="color:#555; margin:5px 0;">We will contact you soon to confirm your booking details.</p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td align="center" style="padding-top:20px; color:#777;">
              <p>Thank you for choosing <strong>Care Nest</strong> ❤️</p>
              <p style="font-size:12px;">This is an automated email. Please do not reply.</p>
              <p style="font-size:12px;">For any queries, please contact our support team.</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
  `;
};