'use client';

import {
  ArrowLeft,
  CheckCircleIcon,
  Clock,
  Copy,
  List,
  Mail,
  Phone,
  Plus,
} from 'lucide-react';
import React from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { toast } from 'sonner';
import Link from 'next/link';
/* eslint-disable @typescript-eslint/no-explicit-any */

interface InterviewsLinkProps {
  interview_id?: string;
  formData?: Record<string, any>;
  questionListLength?: number;
}

const InterviewsLink = ({
  interview_id,
  formData,
  questionListLength,
}: InterviewsLinkProps) => {
  const GetInterviewUrl = () => {
    const url = process.env.NEXT_PUBLIC_HOST_URL + '/' + interview_id;
    return url;
  };

  const handleEmailShare = () => {
    const subject = encodeURIComponent('AI Interview Invitation');
    const body = encodeURIComponent(
      `You are invited to participate in an AI interview. Please use the following link to start: ${GetInterviewUrl()}`
    );
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  };

  const handleWhatsAppShare = () => {
    const message = encodeURIComponent(
      `You are invited to participate in an AI interview. Start here: ${GetInterviewUrl()}`
    );
    window.location.href = `https://wa.me/?text=${message}`;
  };

  return (
    <div className="flex flex-col items-center justify-center mt-10 w-full px-4 max-w-4xl mx-auto overflow-x-hidden">
      <CheckCircleIcon className="bg-green-500 w-14 h-14 mx-auto mb-4 text-white rounded-full" />
      <h2 className="font-bold text-lg text-center">
        AI Interview is generated successfully!
      </h2>
      <p className="mt-3 text-center text-sm sm:text-base">
        Share the following link with the candidates to start the interview
        process
      </p>

      <div className="w-full p-5 sm:p-7 mt-6 rounded-xl bg-white shadow-sm">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
          <h2 className="font-bold text-base sm:text-lg">Interview Link</h2>
          <h2 className="text-purple-600 bg-purple-100 rounded-full px-3 py-1 text-xs sm:text-sm text-center">
            Valid for 30 days
          </h2>
        </div>

        <div className="mt-3 flex flex-col sm:flex-row items-stretch gap-3">
          <Input
            defaultValue={GetInterviewUrl()}
            disabled={true}
            className="border border-black w-full"
          />
          <Button
            className="w-full sm:w-auto bg-gradient-to-t from-purple-500 to-purple-600 text-white hover:from-purple-700 hover:to-purple-800"
            onClick={() => {
              navigator.clipboard.writeText(GetInterviewUrl());
              toast.success('Link copied to clipboard!');
            }}
          >
            <Copy className="mr-2 h-4 w-4" /> Copy Link
          </Button>
        </div>

        <hr className="my-7" />

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-5 sm:items-center">
          <h2 className="text-sm text-gray-500 flex gap-2 items-center">
            <Clock className="h-4 w-4" />
            {formData?.interviewDuration || '0 Minutes'}
          </h2>
          <h2 className="text-sm text-gray-500 flex gap-2 items-center">
            <List className="h-4 w-4" />
            {questionListLength || '0 Questions'}
          </h2>
        </div>
      </div>

      <div className="mt-7 bg-white w-full p-5 rounded-lg shadow-sm">
        <h2 className="font-bold text-base sm:text-lg">Share Via</h2>
        <div className="flex flex-col sm:flex-row gap-3 mt-3">
          <Button
            variant={'outline'}
            className="w-full sm:w-1/2"
            onClick={handleEmailShare}
          >
            <Mail className="mr-2 h-4 w-4" /> Email
          </Button>
          <Button
            variant={'outline'}
            className="w-full sm:w-1/2"
            onClick={handleWhatsAppShare}
          >
            <Phone className="mr-2 h-4 w-4" /> WhatsApp
          </Button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row w-full gap-3 sm:gap-5 justify-center mt-6">
        <Link href={'/dashboard'} className="w-full sm:w-auto">
          <Button variant={'outline'} className="w-full">
            <ArrowLeft className="mr-2 h-4 w-4" />
            <span className="hidden md:inline">Back to Dashboard</span>
          </Button>
        </Link>
        <Link href={'/dashboard/create-interview'} className="w-full sm:w-auto">
          <Button className="w-full bg-gradient-to-t from-purple-600 to-purple-700 hover:from-purple-800 hover:to-purple-900 text-white">
            <Plus className="mr-2 h-4 w-4" />
            <span className="hidden md:inline">Create New Interview</span>
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default InterviewsLink;
