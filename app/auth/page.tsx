import Image from 'next/image'
import React from 'react'
import { Button } from '@/components/ui/button'
import { FcGoogle } from 'react-icons/fc'

const AuthPage = () => {
    return (
        <div className='flex flex-col items-center justify-center min-h-screen'>
            <div className='flex flex-col items-center p-8 md:border-2 md:border-gray-200 md:rounded-xl'>
                <div className='flex flex-row gap-4 items-center mb-4'>
                    <Image
                        src={"/favicon.png"}
                        width={50}
                        height={50}
                        alt="Logo"
                        className='rounded-2xl bg-[#333333]'
                    />
                    <span className='text-4xl font-bold text-purple-500'>Talq</span>
                </div>

                <div className='flex flex-col items-center'>
                    <Image
                        src={"/auth.jpg"}
                        width={400}
                        height={400}
                        alt="Auth"
                        className='rounded-2xl'
                    />
                    <h2 className='text-2xl font-bold text-center mt-5'>Welcome to Talq</h2>
                    <p className='text-gray-500 text-center'>Sign In with your Google Account</p>
                    <Button className='mt-7 w-52 cursor-pointer' variant={"default"}>
                        <FcGoogle size={30} />
                        <span>Sign In with Google</span>
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default AuthPage
