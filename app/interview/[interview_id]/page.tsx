'use client';

import React, { useContext, useEffect, useState } from 'react'
import Image from 'next/image'
import { Clock, Info, Video } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button';
import { useParams, useRouter } from 'next/navigation';
import { supabase } from '@/services/supabaseClient';
import { toast } from 'sonner';
import { InterviewDataContext } from '@/context/InterviewDataContext';

/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-ts-comment */

type InterviewData = {
    rolePosition: string;
    roleDescription: string;
    interviewDuration: string;
    type: string;
};

const InterviewPage = () => {
    const { interview_id } = useParams();
    const [interviewData, setInterviewData] = useState<InterviewData | undefined>();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    // @ts-ignore
    const {interviewInfo, setInterviewInfo} = useContext(InterviewDataContext);
    const router = useRouter();

    useEffect(() => {
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        interview_id && GetInterviewDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [interview_id]);

    const GetInterviewDetails = async () => {
        setLoading(true);
        try {
            const { data: Interviews } = await supabase
                .from('Interviews')
                .select('rolePosition, roleDescription, interviewDuration, type')
                .eq('interview_id', interview_id);
            if (!Interviews || Interviews.length === 0) {
                toast('Invalid Interview link');
            }
            // @ts-ignore
            setInterviewData(Interviews?.[0]);
            // console.log(Interviews?.[0]);
        } catch (error) {
            console.error("Error fetching interview details:", error);
            toast('Invalid Interview link');
        } finally {
            setLoading(false);
        }
    }

    const onJoinInterview = async () => {
        setLoading(true);
        const { data: Interviews } = await supabase
            .from('Interviews')
            .select('*')
            .eq('interview_id', interview_id)
        
        // console.log(Interviews?.[0]);
        setInterviewInfo({
            username: username,
            email: email,
            interviewData: Interviews?.[0]
        });
        router.push(`/interview/${interview_id}/start`);
        setLoading(false);
    }

    return (
        <div className='px-6 sm:px-10 lg:px-16 py-6 max-w-5xl mx-auto'>
            <div className='flex flex-col items-center border-2 border-gray-200 rounded-xl shadow-lg p-8 bg-white'>
                <div className="flex flex-row items-center gap-3">
                    <Image
                        src={"/favicon.png"}
                        alt={"Talq favicon"}
                        width={48}
                        height={48}
                        className="rounded-lg bg-[#333333] p-1"
                    />
                    <span className="text-purple-600 font-bold text-3xl sm:text-4xl">
                        Talq
                    </span>
                </div>
                <div className='flex flex-col md:flex-row mt-10 w-full gap-8 justify-center'>
                    <Image
                        src={"/interview.jpg"}
                        width={400}
                        height={400}
                        alt='Interview illustration'
                        className='rounded-lg border-2 border-purple-600 object-cover'
                    />
                    <div className='flex flex-col justify-center w-full md:w-1/2 space-y-6'>
                        <h2 className='font-bold text-xl text-gray-900'>
                            {interviewData?.rolePosition}
                        </h2>
                        <h3 className='flex items-center gap-2 text-gray-600'>
                            <Clock className="w-5 h-5" /> {interviewData?.interviewDuration}
                        </h3>
                        <div className='w-full space-y-2'>
                            <h2 className='text-gray-700 font-medium'>
                                Enter your Name:
                            </h2>
                            <Input 
                                placeholder='E.g. Vasavi Kulkarni' 
                                className='w-full border-gray-300 focus:border-purple-600 focus:ring-purple-600 rounded-md py-3'
                                onChange={(e: any) => setUsername(e.target.value)}
                            />
                        </div>
                        <div className='w-full space-y-2'>
                            <h2 className='text-gray-700 font-medium'>
                                Enter your Email:
                            </h2>
                            <Input 
                                placeholder='E.g. example@example.com' 
                                className='w-full border-gray-300 focus:border-purple-600 focus:ring-purple-600 rounded-md py-3'
                                onChange={(e: any) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className='p-3 bg-purple-100 flex gap-4 rounded-lg'>
                            <Info className='text-purple-900' />
                            <div>
                                <h2 className='text-purple-600 font-medium'>Before you begin</h2>
                                <ul>
                                    <li className='text-purple-600 text-sm'>- Test your camera and microphone</li>
                                    <li className='text-purple-600 text-sm'>- Ensure you have a stable internet connection</li>
                                    <li className='text-purple-600 text-sm'>- Find a Quiet place for interview</li>
                                </ul>
                            </div>
                        </div>
                        <Button disabled={loading || !username || !email} className='cursor-pointer bg-gradient-to-t mt-5 font-bold text-white w-full from-purple-700 to-purple-800 hover:from-purple-900 hover:to-purple-950' onClick={() => onJoinInterview()}>
                            <Video className='font-bold' /> Join Interview
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default InterviewPage
