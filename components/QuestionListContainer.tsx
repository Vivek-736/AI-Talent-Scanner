import React from 'react'
/* eslint-disable @typescript-eslint/no-explicit-any */

interface QuestionListContainerProps {
    questionList: any[];
}

const QuestionListContainer = ({ questionList }: QuestionListContainerProps) => {
    return (
        <div>
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
        </div>
    )
}

export default QuestionListContainer
