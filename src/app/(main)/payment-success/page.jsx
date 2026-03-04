import PaymentSuccess from '@/components/bookings/PaymentSuccess';
import React, { Suspense } from 'react';

const PaymentSuccessPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
      <PaymentSuccess></PaymentSuccess>
    </Suspense>
    </div>
  );
};

export default PaymentSuccessPage;