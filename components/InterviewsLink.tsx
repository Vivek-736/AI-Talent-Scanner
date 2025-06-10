'use client';

import { ArrowLeft, CheckCircleIcon, Clock, Copy, List, Mail, Phone, Plus } from 'lucide-react';
import React from 'react'
import { Input } from './ui/input';
import { Button } from './ui/button';
import { toast } from 'sonner';
import Link from 'next/link';

/* eslint-disable @typescript-eslint/no-explicit-any */

interface InterviewsLinkProps {
    interview_id?: string;
    formData?: Record<string, any>;
    questionListLength?: number;
}

const InterviewsLink = ({ interview_id, formData, questionListLength }: InterviewsLinkProps) => {
    const GetInterviewUrl = () => {
        const url = process.env.NEXT_PUBLIC_HOST_URL + '/' + interview_id;
        return url;
    }

    const handleEmailShare = () => {
        const subject = encodeURIComponent('AI Interview Invitation');
        const body = encodeURIComponent(`You are invited to participate in an AI interview. Please use the following link to start: ${GetInterviewUrl()}`);
        window.location.href = `mailto:?subject=${subject}&body=${body}`;
    }

    const handleWhatsAppShare = () => {
        const message = encodeURIComponent(`You are invited to participate in an AI interview. Start here: ${GetInterviewUrl()}`);
        window.location.href = `https://wa.me/?text=${message}`;
    }

    return (
        <div className='flex flex-col items-center justify-center mt-10'>
            <CheckCircleIcon className='bg-green-500 w-14 h-14 mx-auto mb-4 text-white rounded-full' />
            <h2 className='font-bold text-lg'>AI Interview is generated successfully!</h2>
            <p className='mt-3'>Share the following link with the candidates to start the interview process</p>
            <div className='w-full p-7 mt-6 rounded-xl bg-white'>
                <div className='flex justify-between items-center'>
                    <h2 className='font-bold'>Interview Link</h2>
                    <h2 className='text-purple-600 bg-purple-100 rounded-4xl px-2 py-1'>Valid for 30 days</h2>
                </div>
                <div className='mt-3 flex items-center gap-3'>
                    <Input defaultValue={GetInterviewUrl()} disabled={true} className='border border-black' />
                    <Button className='bg-gradient-to-t from-purple-500 to-purple-600 text-white hover:from-purple-700 hover:to-purple-800 cursor-pointer' onClick={() => {
                        navigator.clipboard.writeText(GetInterviewUrl());
                        toast.success('Link copied to clipboard!');
                    }}>
                        <Copy /> Copy Link
                    </Button>
                </div>
                <hr className='my-7' />
                <div className='flex gap-5 items-center'>
                    <h2 className='text-sm text-gray-500 flex gap-2 items-center'><Clock className='h-4 w-4l' />{formData?.interviewDuration || '0 Minutes'}</h2>
                    <h2 className='text-sm text-gray-500 flex gap-2 items-center'><List className='h-4 w-4l' />{questionListLength || '0 Questions'}</h2>
                </div>
            </div>
            <div className='mt-7 bg-white w-full p-5 rounded-lg'>
                <h2 className='font-bold'>Share Via</h2>
                <div className='flex gap-2 mt-2'>
                    <Button variant={"outline"} className='cursor-pointer w-1/2' onClick={handleEmailShare}>
                        <Mail /> Email
                    </Button>
                    <Button variant={"outline"} className='cursor-pointer w-1/2' onClick={handleWhatsAppShare}>
                        <Phone /> WhatsApp
                    </Button>
                </div>
            </div>
            <div className='flex w-full gap-5 justify-around mt-6'>
                <Link href={'/dashboard'}>
                    <Button className='cursor-pointer' variant={"outline"}>
                        <ArrowLeft /> Back to Dashboard
                    </Button>
                </Link>
                <Link href={'/dashboard/create-interview'}>
                    <Button className='cursor-pointer bg-gradient-to-t from-purple-600 to-purple-700 hover:from-purple-800 hover:to-purple-900 text-white'>
                        <Plus /> Create New Interview
                    </Button>
                </Link>
            </div>
        </div>
    )
}

export default InterviewsLink
