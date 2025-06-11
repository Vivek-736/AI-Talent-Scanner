'use client';
import React, { useContext } from 'react'
import { InterviewDataContext } from '@/context/InterviewDataContext';
import { Mic, Phone, Timer } from 'lucide-react';
import Image from 'next/image';

const StartInterviewPage = () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const {interviewInfo, setInterviewInfo} = useContext(InterviewDataContext);

    return (
        <div className='p-20 pb-0'>
            <h2 className='font-bold text-xl flex justify-between'>Interview Session
                <span className='flex gap-2 items-center'>
                    <Timer />
                    00:00:00
                </span>
            </h2>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-7 mt-10'>
                <div className='bg-slate-100 h-[400px] rounded-lg border flex flex-col gap-3 items-center justify-center'>
                    <Image
                        src={'/ai.png'}
                        alt='AI Image'
                        width={100}
                        height={100}
                        className='w-[90px] h-[90px] rounded-full border-sky-600 border-2'
                    />
                    <p className='font-medium text-2xl'>AI Agent</p>
                </div>
                <div className='bg-slate-100 h-[400px] rounded-lg border flex flex-col gap-3 items-center justify-center'>
                    <h3 className='text-2xl bg-purple-600 text-white p-4 px-6 rounded-full'>{interviewInfo?.username[0]}</h3>
                    <p className='font-medium text-2xl'>{interviewInfo?.username}</p>
                </div>
            </div>
            <div className='flex justify-center items-center gap-10 mt-10'>
                <Mic className='h-12 w-12 p-3 bg-gray-800 text-white rounded-full cursor-pointer' />
                <Phone className='h-12 w-12 p-3 text-white bg-rose-600 rounded-full cursor-pointer' />
            </div>
        </div>
    )
}

export default StartInterviewPage
