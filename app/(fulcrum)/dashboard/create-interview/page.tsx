'use client';

import React, { useState } from 'react'
import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Progress } from '@/components/ui/progress';
import Form from '@/components/Form';

const CreateInterviewPage = () => {
    const router = useRouter();
    const [step, useStep] = useState(1);

    return (
        <div>
            <div className='flex gap-5 items-center'>
                <ArrowLeft className='text-black hover:text-gray-400 cursor-pointer' onClick={() => router.back()} />
                <h2 className='font-bold text-2xl'>Create New Interview</h2>
            </div>
            <Progress value={step * 33.33} className='my-5' />
            <Form />
        </div>
    )
}

export default CreateInterviewPage
