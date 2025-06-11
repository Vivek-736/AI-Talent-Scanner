"use client";

import React, { useContext, useEffect } from "react";
import { InterviewDataContext } from "@/context/InterviewDataContext";
import Image from "next/image";
import { Mic, Phone, Timer } from "lucide-react";
import Vapi from "@vapi-ai/web";

interface InterviewInfo {
  username: string;
  interviewData: {
    questionList: { question: string }[];
    rolePosition: string;
  };
}

/* eslint-disable @typescript-eslint/no-unused-vars */

interface InterviewDataContextType {
  interviewInfo: InterviewInfo | null;
  setInterviewInfo: React.Dispatch<React.SetStateAction<InterviewInfo | null>>;
}

const StartInterviewPage = () => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  const { interviewInfo, setInterviewInfo } = useContext(
    InterviewDataContext
  ) as InterviewDataContextType;
  const vapi = new Vapi(process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY as string);

  useEffect(() => {
    if (interviewInfo) {
      startCall();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [interviewInfo]);

  const startCall = () => {
    if (!interviewInfo?.interviewData?.questionList) return;
    const questionList = interviewInfo.interviewData.questionList
      .map((item) => item.question)
      .join(", ");

    const assistantOptions = {
      name: "AI Recruiter",
      firstMessage: `Hi ${interviewInfo?.username}, how are you? Ready for your interview on ${interviewInfo?.interviewData?.rolePosition}?`,
      transcriber: {
        provider: "deepgram",
        model: "nova-2",
        language: "en-US",
      },
      voice: {
        provider: "playht",
        voiceId: "jennifer",
      },
      model: {
        provider: "openai",
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: `
      You are an AI voice assistant conducting interviews.
      Your job is to ask candidates provided interview questions, assess their responses.
      Begin the conversation with a friendly introduction, setting a relaxed yet professional tone.
      "Hey there! Welcome to your ${interviewInfo?.interviewData?.rolePosition} interview. Let’s get started with a few questions."
      
      Ask one question at a time and wait for the candidate’s response before proceeding.
      Questions: ${questionList}
      
      If the candidate struggles, offer hints or rephrase the question without giving away the answer.
      "Need a hint? Think about how React tracks component updates!"
      
      Provide brief, encouraging feedback after each answer. Example:
      "Nice! That’s a solid answer."
      "Hmm, not quite! Want to try again?"
      
      Keep the conversation natural and engaging—use casual phrases like "Alright, next up..."
      
      After 5-7 questions, wrap up the interview smoothly by summarizing their performance:
      "That was great! You handled some tough questions well. Keep sharpening your skills!"
      
      End on a positive note.
      "Thanks for chatting! Hope to see you crushing projects soon!"
              `,
          },
        ],
      },
    };
    // console.log(questionList);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    vapi.start(assistantOptions);
  };

  return (
    <div className="p-20 pb-0">
      <h2 className="font-bold text-xl flex justify-between">
        Interview Session
        <span className="flex gap-2 items-center">
          <Timer />
          00:00:00
        </span>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-7 mt-10">
        <div className="bg-slate-100 h-[400px] rounded-lg border flex flex-col gap-3 items-center justify-center">
          <Image
            src="/ai.png"
            alt="AI Image"
            width={90}
            height={90}
            className="w-[90px] h-[90px] rounded-full border-sky-600 border-2"
          />
          <p className="font-medium text-2xl">AI Agent</p>
        </div>
        <div className="bg-slate-100 h-[400px] rounded-lg border flex flex-col gap-3 items-center justify-center">
          <h3 className="text-2xl bg-purple-600 text-white p-4 px-6 rounded-full">
            {interviewInfo?.username?.[0] ?? ""}
          </h3>
          <p className="font-medium text-2xl">
            {interviewInfo?.username ?? "User"}
          </p>
        </div>
      </div>
      <div className="flex justify-center items-center gap-10 mt-10">
        <Mic className="h-12 w-12 p-3 bg-gray-800 text-white rounded-full cursor-pointer" />
        <Phone className="h-12 w-12 p-3 text-white bg-rose-600 rounded-full cursor-pointer" />
      </div>
    </div>
  );
};

export default StartInterviewPage;
