import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Logo = () => {
    return (
        <Link href={"/"} className='flex items-center gap-1'>
            <Image alt='care-nest logo' src={"/assets/hands-holding-heart.png"} width={40} height={30}></Image>
            <h2 className='text-xl font-bold'>Care <span className='text-primary'>Nest</span></h2>
        </Link>
    );
};

export default Logo;