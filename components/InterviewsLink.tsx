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
        <div className='flex flex-col items-center justify-center px-4 py-6 sm:py-10 min-h-screen'>
            <CheckCircleIcon className='bg-green-500 w-12 h-12 sm:w-14 sm:h-14 mx-auto mb-4 text-white rounded-full' />
            <h2 className='font-bold text-lg sm:text-xl text-center'>AI Interview is generated successfully!</h2>
            <p className='mt-3 text-sm sm:text-base text-center'>Share the following link with the candidates to start the interview process</p>
            <div className='w-full max-w-md sm:max-w-lg p-4 sm:p-7 mt-6 rounded-xl bg-white'>
                <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-0'>
                    <h2 className='font-bold text-base sm:text-lg'>Interview Link</h2>
                    <h2 className='text-purple-600 bg-purple-100 rounded-4xl px-2 py-1 text-xs sm:text-sm'>Valid for 30 days</h2>
                </div>
                <div className='mt-3 flex flex-col sm:flex-row items-center gap-3'>
                    <Input defaultValue={GetInterviewUrl()} disabled={true} className='border border-black w-full text-sm' />
                    <Button 
                        className='bg-gradient-to-t from-purple-500 to-purple-600 text-white hover:from-purple-700 hover:to-purple-800 w-full sm:w-auto text-sm sm:text-base py-2 sm:py-0' 
                        onClick={() => {
                            navigator.clipboard.writeText(GetInterviewUrl());
                            toast.success('Link copied to clipboard!');
                        }}
                    >
                        <Copy className='w-4 h-4 mr-1' /> Copy Link
                    </Button>
                </div>
                <hr className='my-4 sm:my-7' />
                <div className='flex flex-col sm:flex-row gap-3 sm:gap-5 items-start sm:items-center'>
                    <h2 className='text-xs sm:text-sm text-gray-500 flex gap-2 items-center'>
                        <Clock className='h-4 w-4' />
                        {formData?.interviewDuration || '0 Minutes'}
                    </h2>
                    <h2 className='text-xs sm:text-sm text-gray-500 flex gap-2 items-center'>
                        <List className='h-4 w-4' />
                        {questionListLength || '0 Questions'}
                    </h2>
                </div>
            </div>
            <div className='mt-4 sm:mt-7 bg-white w-full max-w-md sm:max-w-lg p-4 sm:p-5 rounded-lg'>
                <h2 className='font-bold text-base sm:text-lg'>Share Via</h2>
                <div className='flex flex-col sm:flex-row gap-2 mt-2'>
                    <Button 
                        variant={"outline"} 
                        className='w-full text-sm sm:text-base py-2 sm:py-0' 
                        onClick={handleEmailShare}
                    >
                        <Mail className='w-4 h-4 mr-1' /> Email
                    </Button>
                    <Button 
                        variant={"outline"} 
                        className='w-full text-sm sm:text-base py-2 sm:py-0' 
                        onClick={handleWhatsAppShare}
                    >
                        <Phone className='w-4 h-4 mr-1' /> WhatsApp
                    </Button>
                </div>
            </div>
            <div className='flex flex-col sm:flex-row w-full max-w-md sm:max-w-lg gap-3 sm:gap-5 justify-around mt-4 sm:mt-6'>
                <Link href={'/dashboard'} className='w-full'>
                    <Button className='w-full text-sm sm:text-base py-2 sm:py-0' variant={"outline"}>
                        <ArrowLeft className='w-4 h-4 mr-1' /> Back to Dashboard
                    </Button>
                </Link>
                <Link href={'/dashboard/create-interview'} className='w-full'>
                    <Button className='w-full text-sm sm:text-base py-2 sm:py-0 bg-gradient-to-t from-purple-600 to-purple-700 hover:from-purple-800 hover:to-purple-900 text-white'>
                        <Plus className='w-4 h-4 mr-1' /> Create New Interview
                    </Button>
                </Link>
            </div>
        </div>
    )
}

export default InterviewsLink
