'use client';
import React, { useState } from 'react'
import { InterviewDataContext } from '@/context/InterviewDataContext'

const InterviewLayout = ({ children }: { children: React.ReactNode }) => {
    const [interviewInfo, setInterviewInfo] = useState();

    return (
        <InterviewDataContext.Provider value={{interviewInfo, setInterviewInfo}}>
            <div>
                {children}
            </div>
        </InterviewDataContext.Provider>
    )
}

export default InterviewLayout
