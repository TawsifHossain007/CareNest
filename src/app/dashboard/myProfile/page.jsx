import MyProfile from '@/components/myProfile/MyProfile';
import { getUserByEmail } from '@/actions/server/Users';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import React from 'react';

const MyProfilePage = async () => {
    const session = await getServerSession(authOptions);
    const user = await getUserByEmail(session?.user?.email);

    return (
        <div>
            <MyProfile user={user} />
        </div>
    );
};

export default MyProfilePage;