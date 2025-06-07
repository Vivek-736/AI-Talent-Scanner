'use client';
import React, { useState, useEffect } from 'react'
import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Progress } from '@/components/ui/progress';
import Form from '@/components/Form';

const CreateInterviewPage = () => {
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({});

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const onHandleInputChange = (field: any, value: any) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value
        }))
    }

    useEffect(() => {
        console.log("FormData:", formData);
    }, [formData]);

    return (
        <div>
            <div className='flex gap-5 items-center'>
                <ArrowLeft className='text-black hover:text-gray-400 cursor-pointer' onClick={() => router.back()} />
                <h2 className='font-bold text-2xl'>Create New Interview</h2>
            </div>
            <Progress value={step * 33.33} className='my-5' />
            <Form onHandleInputChange={onHandleInputChange} />
        </div>
    )
}

export default CreateInterviewPage
