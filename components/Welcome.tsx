'use client';
import { useUser } from '@/app/Provider';
import React from 'react'
import Image from 'next/image';

const Welcome = () => {
    const user = useUser();

    return (
        <div className='bg-white p-5 rounded-xl flex items-center justify-between'>
            <div>
                <h2 className='text-lg font-bold'>Welcome, {user?.user?.name}</h2>
                <h2 className='text-gray-500'>AI powered interviews, slick hiring!</h2>
            </div>
            {user?.user && <Image src={user?.user?.picture} alt='User Image' width={40} height={40} className='rounded-full' />}
        </div>
    )
}

export default Welcome
