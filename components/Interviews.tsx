"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import dayjs from "dayjs";
import { useUser } from "@/app/Provider";
import { supabase } from "@/services/supabaseClient";
import { FaFacebook } from "react-icons/fa";
import {
  FcGoogle,
  FcLinux,
  FcAndroidOs,
  FcReddit,
  FcCommandLine,
} from "react-icons/fc";
import { BsGithub } from "react-icons/bs";
import { IconType } from "react-icons";
import { Camera } from "lucide-react";
import { toast } from "sonner";
import SendButton from "./SendButton";

interface Interview {
  id: number;
  created_at: string;
  rolePosition: string;
  roleDescription: string;
  interviewDuration: string;
  userEmail: string;
  interview_id: string;
}

const techIcons: IconType[] = [
  FcGoogle,
  FcLinux,
  FcAndroidOs,
  FcReddit,
  FcCommandLine,
  BsGithub,
  FaFacebook,
];

const getRandomIcon = (): IconType => {
  const index = Math.floor(Math.random() * techIcons.length);
  return techIcons[index];
};

const getInterviewUrl = (interviewId: string): string => {
  return `${process.env.NEXT_PUBLIC_HOST_URL}/${interviewId}`;
};

const Interviews: React.FC = () => {
  const [interviews, setInterviews] = useState<Interview[]>([]);
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      fetchInterviews();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const fetchInterviews = async () => {
    const { data } = await supabase
      .from("Interviews")
      .select("*")
      .eq("userEmail", user?.email);
    if (data) setInterviews(data);
  };

  return (
    <div className="my-6">
      <h2 className="text-2xl font-bold mb-6">Created Interviews</h2>

      {interviews.length === 0 ? (
        <div className="flex flex-col items-center justify-center">
          <Camera className="w-14 h-14 mb-4 text-purple-600" />
          <p className="text-gray-500 text-lg mb-6">No interviews exist yet</p>
          <Link href="/dashboard/create-interview">
            <button className="bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 px-4 rounded-lg">
              Create an Interview
            </button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {interviews.map((interview) => {
            const Icon = getRandomIcon();
            const shareUrl = getInterviewUrl(interview.interview_id);

            return (
              <div
                key={interview.id}
                className="bg-white border border-gray-200 shadow-md rounded-xl p-4 hover:shadow-lg transition"
              >
                <div className="flex items-center justify-between mb-2">
                  <Icon size={28} />
                  <span className="text-sm text-gray-500">
                    {dayjs(interview.created_at).format("DD MMM YYYY")}
                  </span>
                </div>
                <h3 className="text-lg font-semibold capitalize mb-1">
                  {interview.rolePosition}
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  {interview.interviewDuration}
                </p>
                <div className="flex gap-2">
                  <button
                    className="flex-1 cursor-pointer border px-4 py-1 rounded-md text-sm font-medium hover:bg-gray-100"
                    onClick={() => {
                      navigator.clipboard.writeText(shareUrl);
                      toast.success("Link copied to clipboard!");
                    }}
                  >
                    Copy Link
                  </button>
                  <SendButton
                    onClick={() => {
                      const message = encodeURIComponent(
                        `You are invited to participate in an AI interview. Start here: ${shareUrl}`
                      );
                      window.open(`https://wa.me/?text=${message}`, "_blank");
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Interviews;
