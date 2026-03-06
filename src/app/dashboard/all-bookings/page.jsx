import { GetAllBookings } from '@/actions/server/Booking';
import AllBookings from '@/components/AllBookings/AllBookings';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import { redirect } from 'next/navigation';

const AllBookingsPage = async () => {
    const session = await getServerSession(authOptions);
    
    if (!session?.user) {
        redirect('/login?callbackUrl=/dashboard/all-bookings');
    }
    
    if (session.user.role !== 'admin') {
        redirect('/dashboard');
    }
    
    const bookings = await GetAllBookings();
    
    return (
        <div>
            <AllBookings bookings={bookings} />
        </div>
    );
};

export default AllBookingsPage;