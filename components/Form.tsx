import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import React from 'react'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import { InterviewTypes } from "@/services/Constants"
import { Button } from "./ui/button"
import { ArrowRight } from "lucide-react"

const Form = () => {
    return (
        <div className='p-5 bg-white rounded-lg'>
            <div>
                <h2 className='text-sm font-medium'>Role position</h2>
                <Input placeholder='Example: Full stack developer' className='mt-2' />
            </div>

            <div className='mt-6'>
                <h2 className='text-sm font-medium'>Role description</h2>
                <Textarea placeholder='Enter detailed role description.....' className='h-[200px] mt-2' />
            </div>

            <div className="mt-6">
                <h2 className='text-sm font-medium'>Interview Duration</h2>
                <Select>
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
                        <div key={index} className="flex gap-2 p-1 px-2 bg-white border border-gray-400 rounded-2xl">
                            <type.icon />
                            <span>{type.title}</span>
                        </div>
                    ))}
                </div>
            </div>
            <div className="mt-20 flex justify-end">
                <Button className="cursor-pointer">
                    Generate Questions <ArrowRight />
                </Button>
            </div>
        </div>
    )
}

export default Form
