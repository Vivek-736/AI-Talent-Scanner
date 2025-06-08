'use client';

import React, { useState, useEffect } from 'react'
import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Progress } from '@/components/ui/progress';
import Form from '@/components/Form';
import QuestionList from '@/components/QuestionList';
import { toast } from 'sonner';

const CreateInterviewPage = () => {
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({});

    const onGoToNext = () => {
        if(Object.keys(formData).length < 4) {
            toast("Please fill all the fields!")
            return;
        }
        setStep(step + 1);
    }

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
            {step == 1 ? <Form onHandleInputChange={onHandleInputChange} GoToNext={() => onGoToNext()} />
            :step == 2 ? <QuestionList formData={formData} /> : null}
        </div>
    )
}

export default CreateInterviewPage
