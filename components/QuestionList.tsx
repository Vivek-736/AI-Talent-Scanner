'use client';

import axios from 'axios';
import { Loader2Icon } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { Button } from './ui/button';
/* eslint-disable @typescript-eslint/no-explicit-any */

interface QuestionListProps {
    formData: any;
}

const QuestionList = ({ formData }: QuestionListProps) => {
    const [loading, setLoading] = useState(true);
    const [questionList, setQuestionList] = useState([]);

    useEffect(() => {
        if (formData) {
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
            const content = result?.data?.content;
            if (typeof content !== 'string' || !content) {
                throw new Error('Invalid or missing content in API response');
            }
            const cleanedContent = content
                .replace(/```json\n|```/g, '')
                .replace(/\n/g, '')
                .trim();
            setQuestionList(JSON.parse(cleanedContent)?.interviewQuestions || []);
        } catch (error) {
            toast('Server error, try again');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const onFinish = () => {

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
            {questionList?.length > 0 && <div>
                <h2 className='font-bold text-lg mb-5 text-center'>Generated Interview Questions</h2>
                <div className='p-5 bg-purple-50 border-purple-200 border-2 rounded-xl'>
                    {questionList.map((item: any, index) => (
                        <div 
                            key={index} 
                            className='p-4 mb-3 bg-white rounded-lg shadow-sm border border-purple-100 hover:shadow-md transition-shadow duration-200'
                        >
                            <h2 className='font-semibold text-lg text-gray-800'>{item?.question}</h2>
                            <p className='text-sm text-purple-600 mt-1'>Type: {item?.type}</p>
                        </div>
                    ))}
                </div>
            </div>}
            {!loading && <div className='mt-5 flex justify-end'>
                <Button onClick={onFinish}>
                    Finish
                </Button>
            </div>}
        </div>
    );
};

export default QuestionList;
