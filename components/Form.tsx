'use client';

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import React, { useState } from 'react'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import { InterviewTypes } from "@/services/Constants"
import { Button } from "./ui/button"
import { ArrowRight } from "lucide-react"

/* eslint-disable @typescript-eslint/no-explicit-any */

interface FormProps {
    onHandleInputChange: (field: any, value: any) => void;
    GoToNext: () => void;
}

const Form = ({ onHandleInputChange, GoToNext }: FormProps) => {
    const [interviewType, setInterviewType] = useState<string[]>([]);

    const handleInterviewTypeChange = (type: string) => {
        let updatedTypes: string[];
        if (interviewType.includes(type)) {
            updatedTypes = interviewType.filter(t => t !== type);
        } else {
            updatedTypes = [...interviewType, type];
        }
        setInterviewType(updatedTypes);
        onHandleInputChange('type', updatedTypes);
    };

    return (
        <div className='p-5 bg-white rounded-lg'>
            <div>
                <h2 className='text-sm font-medium'>Role position</h2>
                <Input 
                    placeholder='Example: Full stack developer' 
                    className='mt-2' 
                    onChange={(event) => onHandleInputChange('rolePosition', event.target.value)} 
                />
            </div>

            <div className='mt-6'>
                <h2 className='text-sm font-medium'>Role description</h2>
                <Textarea 
                    placeholder='Enter detailed role description.....' 
                    className='h-[200px] mt-2'
                    onChange={(event) => onHandleInputChange('roleDescription', event.target.value)}
                />
            </div>

            <div className="mt-6">
                <h2 className='text-sm font-medium'>Interview Duration</h2>
                <Select onValueChange={(value) => onHandleInputChange('interviewDuration', value)}>
                    <SelectTrigger className="w-full mt-2">
                        <SelectValue placeholder="Select Duration" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="5 Min">5 minutes</SelectItem>
                        <SelectItem value="15 Min">15 minutes</SelectItem>
                        <SelectItem value="30 Min">30 minutes</SelectItem>
                        <SelectItem value="45 Min">45 minutes</SelectItem>
                        <SelectItem value="60 Min">60 minutes</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div className="mt-6">
                <h2 className="text-sm font-medium">Interview Type</h2>
                <div className="flex items-center cursor-pointer gap-3 flex-wrap mt-2">
                    {InterviewTypes.map((type, index) => (
                        <div 
                            key={index} 
                            className={`flex gap-2 p-1 px-2 border rounded-2xl ${interviewType.includes(type.title) ? 'bg-blue-100 border-blue-500' : 'bg-white border-gray-400'}`} 
                            onClick={() => handleInterviewTypeChange(type.title)}
                        >
                            <type.icon />
                            <span>{type.title}</span>
                        </div>
                    ))}
                </div>
            </div>
            <div className="mt-14 flex justify-end">
                <Button className="cursor-pointer" onClick={() => GoToNext()}>
                    Generate Questions <ArrowRight />
                </Button>
            </div>
        </div>
    )
}

export default Form
