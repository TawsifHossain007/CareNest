import { GetBookings } from "@/actions/server/Booking";
import MyBookings from "@/components/MyBookings/MyBookings";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { redirect } from "next/navigation";

export const metadata = {
  title: "My Bookings",
  description: "View and manage your service bookings",
};

const MyBookingsPage = async () => {
  const session = await getServerSession(authOptions);
  
  if (!session?.user) {
    redirect('/login?callbackUrl=/dashboard/my-bookings');
  }
 
  const bookings = await GetBookings();

  return <MyBookings bookings={bookings} />;
};

export default MyBookingsPage;
