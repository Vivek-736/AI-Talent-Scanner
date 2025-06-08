'use client';

import axios from 'axios';
import { Loader2Icon } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner';

/* eslint-disable @typescript-eslint/no-explicit-any */

interface QuestionListProps {
    formData: any;
}

const QuestionList = ({ formData }: QuestionListProps) => {
    const [loading, setLoading] = useState(true);
    const [questionList, setQuestionList] = useState();

    useEffect(() => {
        if(formData) {
            GenerateQuestionList();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formData]);

    const GenerateQuestionList = async () => {
        setLoading(true);
        try {
            const result = await axios.post('/api/ai-model', {
            ...formData
            });
            console.log(result.data.content);
            const content = result.data.content;
            const FINAL_JSON = content.replace('"```json', '').replace('```"', ''); 
            setQuestionList(JSON.parse(FINAL_JSON));
        } catch (error) {
            toast('Server error, try again');
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div>
            {loading && 
            <div className='p-5 bg-purple-100 rounded-xl border-2 border-purple-600 flex gap-5 items-center'>
                <Loader2Icon className='animate-spin' />
                <div>
                    <h2 className='font-medium'>Generating Interview Questions</h2>
                    <p className='text-purple-600'>Our AI is crafting personalized questions based on your role position</p>
                </div>
            </div>}
        </div>
    )
}

export default QuestionList
