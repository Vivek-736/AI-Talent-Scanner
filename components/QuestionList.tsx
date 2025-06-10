'use client';

import axios from 'axios';
import { Loader2Icon } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { Button } from './ui/button';
import QuestionListContainer from './QuestionListContainer';
import { supabase } from '@/services/supabaseClient';
import { useUser } from '@/app/Provider';
import { v4 as uuidv4 } from 'uuid';
/* eslint-disable @typescript-eslint/no-explicit-any */

interface QuestionListProps {
    formData: any;
    onCreateLink: (interviewId: string, questionListLength: number) => void;
}

const QuestionList = ({ formData, onCreateLink }: QuestionListProps) => {
    const [loading, setLoading] = useState(true);
    const [questionList, setQuestionList] = useState([]);
    const { user } = useUser();

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
            console.log('API Response:', result?.data);
            const content = result?.data?.content;
            if (!content || typeof content !== 'string') {
                console.log('Invalid or missing content in API response');
            }
            const cleanedContent = content
                ?.replace(/```json\n|```/g, '')
                ?.replace(/\n/g, '')
                ?.trim();
            setQuestionList(JSON?.parse(cleanedContent)?.interviewQuestions || []);
        } catch (error) {
            toast('Server error, try again');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const onFinish = async () => {
        const interview_id = uuidv4();
        const { data, error } = await supabase
            .from('Interviews')
            .insert([
                {
                    ...formData,
                    questionList: questionList,
                    userEmail: user?.email,
                    interview_id: interview_id
                }
            ])
            .select();
        console.log(data, error);

        onCreateLink(interview_id, questionList.length);
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
            <QuestionListContainer questionList={questionList} />
            </div>}
            {!loading && <div className='mt-5 flex justify-end'>
            <Button
                onClick={onFinish}
                className={`bg-gradient-to-t from-purple-500 to-purple-600 hover:bg-purple-700 text-white ${loading ? 'cursor-progress' : 'cursor-pointer'}`}
                disabled={loading}
            >
                Finish
            </Button>
            </div>}
        </div>
    );
};

export default QuestionList;
