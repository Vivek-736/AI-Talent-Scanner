"use client";

import React, { useContext, useEffect, useRef, useState } from "react";
import { InterviewDataContext } from "@/context/InterviewDataContext";
import Image from "next/image";
import { Mic, Phone } from "lucide-react";
import AlertConfirmation from "@/components/AlertConfirmation";
import { toast } from "sonner";
import { useVapi } from "@/context/VapiContext";
import axios from "axios";

/* eslint-disable @typescript-eslint/no-explicit-any */

interface InterviewInfo {
  username: string;
  interviewData: {
    questionList: { question: string }[];
    rolePosition: string;
    interview_id: string;
  };
}

interface InterviewDataContextType {
  interviewInfo: InterviewInfo | null;
  setInterviewInfo: React.Dispatch<React.SetStateAction<InterviewInfo | null>>;
}

const StartInterviewPage = () => {
  const { interviewInfo } = useContext(
    InterviewDataContext
  ) as InterviewDataContextType;
  const vapi = useVapi();
  const [activeUser, setActiveUser] = useState(false);
  const [conversation, setConversation] = useState<any[]>([]);
  const conversationRef = useRef<any[]>([]);

  useEffect(() => {
    if (interviewInfo) {
      startCall();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [interviewInfo]);

  // Event listeners
  useEffect(() => {
    vapi.on("call-start", () => {
      console.log("Call has started...");
      toast("Interview connected...");
    });

    vapi.on("speech-start", () => {
      console.log("Assistant speech has started");
      setActiveUser(false);
    });

    vapi.on("speech-end", () => {
      console.log("Assistant speech has ended");
      setActiveUser(true);
    });

    vapi.on("call-end", () => {
      console.log("Call has ended...");
      toast("Interview ended...");

      setTimeout(() => {
        if (conversationRef.current && conversationRef.current.length > 0) {
          GenerateFeedback();
        } else {
          console.warn("No conversation data available to send for feedback.");
          toast.warning("No conversation captured.");
        }
      }, 1000);
    });

    vapi.on("message", (message) => {
      if (message?.conversation) {
        console.log("New message:", message.conversation);
        setConversation(message.conversation);
        conversationRef.current = message.conversation;
      } else {
        console.warn("Received undefined conversation from vapi.on(message)");
      }
    });
  }, [vapi]);

  const GenerateFeedback = async () => {
    try {
      const result = await axios.post("/api/ai-feedback", {
        conversation: conversationRef.current,
      });

      if (result.data?.status === 429) {
        console.warn("Rate limit hit:", result.data?.error);
        toast.warning("Too many requests. Please try again later.");
        return;
      }

      const content = result?.data?.content;
      const final_content = content
        ?.replace(/```json\n|```/g, "")
        ?.replace(/\n/g, "")
        ?.trim();

      console.log("Final feedback:", final_content);
    } catch (error) {
      console.error("Error generating feedback:", error);
      toast.error("Failed to generate feedback.");
    }
  };

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
              Provide brief, encouraging feedback after each answer.
              Keep the conversation natural and engaging.
              After 5-7 questions, wrap up the interview smoothly by summarizing their performance.
              End on a positive note.
            `,
          },
        ],
      },
    };
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    vapi.start(assistantOptions);
  };

  return (
    <div className="p-20">
      <h2 className="font-bold text-xl flex items-center justify-center">
        Interview Session
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-7 mt-10">
        <div className="bg-slate-100 h-[400px] rounded-lg border flex flex-col gap-3 items-center justify-center">
          <div className="relative">
            {!activeUser && (
              <span className="absolute inset-0 rounded-full bg-cyan-400 opacity-75 animate-ping" />
            )}
            <Image
              src="/ai.png"
              alt="AI Image"
              width={90}
              height={90}
              className="w-[90px] h-[90px] rounded-full border-sky-600 border-2"
            />
          </div>
          <p className="font-medium text-2xl">AI Agent</p>
        </div>
        <div className="bg-slate-100 h-[400px] rounded-lg border flex flex-col gap-3 items-center justify-center">
          <div className="relative">
            {activeUser && (
              <span className="absolute inset-0 rounded-full bg-purple-400 opacity-75 animate-ping" />
            )}
            <h3 className="text-2xl bg-purple-600 text-white p-4 px-6 rounded-full">
              {interviewInfo?.username?.[0] ?? ""}
            </h3>
          </div>
          <p className="font-medium text-2xl">
            {interviewInfo?.username ?? "User"}
          </p>
        </div>
      </div>
      <div className="flex justify-center items-center gap-10 mt-10">
        <Mic className="h-12 w-12 p-3 bg-gray-800 text-white rounded-full cursor-pointer" />
        <AlertConfirmation
          stopInterview={() => vapi.stop()}
          interviewId={interviewInfo?.interviewData?.interview_id ?? ""}
        >
          <Phone className="h-12 w-12 p-3 text-white bg-rose-600 hover:bg-rose-800 rounded-full cursor-pointer" />
        </AlertConfirmation>
      </div>
    </div>
  );
};

export default StartInterviewPage;
