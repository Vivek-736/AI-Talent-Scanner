'use client';
import React, { useState } from 'react';
import { Camera } from 'lucide-react';
import Link from 'next/link';

const Interviews = () => {
    const [interviews, setInterviews] = useState([]);
    
    return (
        <div className="my-5">
            <h2 className="text-2xl font-bold mb-4">Recently Created Interviews</h2>
            {interviews?.length === 0 && (
                <div className="flex flex-col items-center justify-center">
                    <Camera className="w-14 h-14 mb-4 text-purple-600" />
                    <p className="text-gray-500 text-lg mb-6">No interviews exist yet</p>
                    <Link href="/dashboard/create-interview">
                        <button 
                            className="bg-purple-500 cursor-pointer hover:bg-purple-600 text-white font-semibold py-2 px-4 rounded-lg"
                            >
                            Create an Interview
                        </button>
                    </Link>
                </div>
            )}
        </div>
    );
};

export default Interviews;
