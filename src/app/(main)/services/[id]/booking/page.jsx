import Booking from '@/components/bookings/Booking';
import React from 'react';

const BookingPage = async ({ params }) => {
    return (
        <div>
            <Booking params={params} />
        </div>
    );
};

export default BookingPage;