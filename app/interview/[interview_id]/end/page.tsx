import React from "react";

const EndInterviewPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center transform transition-all duration-500 hover:scale-105">
        <h1 className="text-3xl font-bold text-indigo-600 mb-4">
          Congratulations!
        </h1>
        <p className="text-gray-600 text-lg mb-6">
          You&apos;ve successfully completed your interview. Thank you for your time
          and effort!
        </p>
        <div className="flex justify-center mb-6">
          <svg
            className="w-16 h-16 text-indigo-500 animate-pulse"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
            ></path>
          </svg>
        </div>
        <p className="text-gray-500 mb-8">
          We&apos;ll be in touch soon with the next steps. Feel free to relax and
          celebrate this milestone!
        </p>
      </div>
    </div>
  );
};

export default EndInterviewPage;
