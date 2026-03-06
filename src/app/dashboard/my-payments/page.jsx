import MyPayments from '@/components/MyPayments/MyPayments';
import { getPaymentsByEmail } from '@/actions/server/Payments';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import { redirect } from 'next/navigation';

const MyPaymentsPage = async () => {
    const session = await getServerSession(authOptions);
    
    if (!session?.user) {
        redirect('/login?callbackUrl=/dashboard/my-payments');
    }
    
    const payments = await getPaymentsByEmail(session.user.email);
    
    return (
        <div>
            <MyPayments payments={payments} />
        </div>
    );
};

export default MyPaymentsPage;