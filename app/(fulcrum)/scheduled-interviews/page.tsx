"use client";

import React, { useEffect, useState } from "react";
import { useUser } from "@/app/Provider";
import { supabase } from "@/services/supabaseClient";
import { IconType } from "react-icons";
import { FaFacebook } from "react-icons/fa";
import {
  FcGoogle,
  FcLinux,
  FcAndroidOs,
  FcReddit,
  FcCommandLine,
} from "react-icons/fc";
import { BsGithub } from "react-icons/bs";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Rating {
  technicalSkills: string;
  communication: string;
  problemSolving: string;
  experience: string;
}

interface Feedback {
  rating: Rating;
  summary: string;
  recommendation: string;
  recommendationMsg: string;
}

interface InterviewFeedback {
  username: string;
  email: string;
  feedback: { feedback: Feedback } | null;
}

interface Interview {
  rolePosition: string;
  interviewDuration: string;
  interview_id: string;
  "interview-feedback": InterviewFeedback[];
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

const ScheduledInterviews: React.FC = () => {
  const [interviews, setInterviews] = useState<Interview[]>([]);
  const { user } = useUser();
  const [selectedEmail, setSelectedEmail] = useState<string>("");

  useEffect(() => {
    if (user) {
      GetInterviewLists();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const GetInterviewLists = async () => {
    const { data } = await supabase
      .from("Interviews")
      .select(
        "rolePosition, interviewDuration, interview_id, interview-feedback(email, feedback, username)"
      )
      .eq("userEmail", user?.email)
      .order("id", { ascending: false });

    // console.log("Scheduled Interviews Data:", data);

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    setInterviews(data);
  };

  const getRatingColor = (rating: string) => {
    const num = parseInt(rating);
    return num < 5 ? "text-red-600" : "text-green-600";
  };

  return (
    <div className="my-6 px-4 sm:px-6 lg:px-8">
      <h2 className="text-2xl font-bold mb-6">Scheduled Interviews</h2>

      {interviews.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12">
          <p className="text-gray-500 text-lg">No scheduled interviews yet</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {interviews.map((interview) => {
            const Icon = getRandomIcon();
            const candidateCount = interview["interview-feedback"].length;

            return (
              <div
                key={interview.interview_id}
                className="bg-white border border-gray-200 shadow-md rounded-xl p-6 hover:shadow-lg transition duration-300"
              >
                <div className="flex items-center justify-between mb-3">
                  <Icon size={32} />
                  <span className="text-sm text-gray-500 font-medium">
                    ID: {interview.interview_id.slice(0, 8)}
                  </span>
                </div>
                <h3 className="text-xl font-semibold capitalize mb-2 text-gray-800">
                  {interview.rolePosition}
                </h3>
                <p className="text-sm text-gray-600 mb-3">
                  {interview.interviewDuration}
                </p>
                <p className="text-sm text-green-600 font-medium mb-4">
                  Candidates: {candidateCount}
                </p>
                {candidateCount > 0 && (
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="w-full cursor-pointer bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2.5 rounded-lg transition-colors">
                        View Details
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="w-full max-w-[90vw] sm:max-w-[80vw] md:max-w-[700px] lg:max-w-[900px] max-h-[90vh] overflow-y-auto p-6 rounded-xl">
                      <DialogHeader>
                        <DialogTitle className="text-2xl font-bold text-gray-800">
                          Candidate Feedback
                        </DialogTitle>
                      </DialogHeader>
                      <div className="mt-6">
                        <h4 className="text-lg font-semibold text-gray-700 mb-3">
                          Candidates:
                        </h4>
                        <div className="mb-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {interview["interview-feedback"].map(
                            (candidate, index) => (
                              <p
                                key={index}
                                className="text-sm text-gray-800 bg-gray-50 p-3 rounded-lg"
                              >
                                {candidate.email}{" "}
                                <span className="text-gray-500">
                                  ({candidate.username})
                                </span>
                              </p>
                            )
                          )}
                        </div>
                        <Select
                          onValueChange={setSelectedEmail}
                          value={selectedEmail}
                        >
                          <SelectTrigger className="w-full border-gray-300 rounded-lg p-3">
                            <SelectValue placeholder="Select a candidate" />
                          </SelectTrigger>
                          <SelectContent>
                            {interview["interview-feedback"].map(
                              (candidate, index) => (
                                <SelectItem
                                  key={index}
                                  value={candidate.email}
                                  className="text-sm"
                                >
                                  {candidate.email}
                                </SelectItem>
                              )
                            )}
                          </SelectContent>
                        </Select>
                        {selectedEmail && (
                          <div className="mt-6">
                            {interview["interview-feedback"].find(
                              (c) => c.email === selectedEmail
                            )?.feedback?.feedback ? (
                              (() => {
                                const feedback = interview[
                                  "interview-feedback"
                                ].find((c) => c.email === selectedEmail)!
                                  .feedback!.feedback;
                                return (
                                  <div className="space-y-4">
                                    <h5 className="text-lg font-semibold text-gray-700">
                                      Feedback:
                                    </h5>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                      <div className="bg-gray-50 p-4 rounded-lg">
                                        <p
                                          className={`text-sm font-medium ${getRatingColor(
                                            feedback.rating.technicalSkills
                                          )}`}
                                        >
                                          <span className="font-semibold">
                                            Technical Skills:
                                          </span>{" "}
                                          {feedback.rating.technicalSkills}/10
                                        </p>
                                      </div>
                                      <div className="bg-gray-50 p-4 rounded-lg">
                                        <p
                                          className={`text-sm font-medium ${getRatingColor(
                                            feedback.rating.communication
                                          )}`}
                                        >
                                          <span className="font-semibold">
                                            Communication:
                                          </span>{" "}
                                          {feedback.rating.communication}/10
                                        </p>
                                      </div>
                                      <div className="bg-gray-50 p-4 rounded-lg">
                                        <p
                                          className={`text-sm font-medium ${getRatingColor(
                                            feedback.rating.problemSolving
                                          )}`}
                                        >
                                          <span className="font-semibold">
                                            Problem Solving:
                                          </span>{" "}
                                          {feedback.rating.problemSolving}/10
                                        </p>
                                      </div>
                                      <div className="bg-gray-50 p-4 rounded-lg">
                                        <p
                                          className={`text-sm font-medium ${getRatingColor(
                                            feedback.rating.experience
                                          )}`}
                                        >
                                          <span className="font-semibold">
                                            Experience:
                                          </span>{" "}
                                          {feedback.rating.experience}/10
                                        </p>
                                      </div>
                                    </div>
                                    <div className="bg-gray-50 p-4 rounded-lg">
                                      <p className="text-sm text-gray-800">
                                        <span className="font-semibold">
                                          Summary:
                                        </span>{" "}
                                        {feedback.summary}
                                      </p>
                                    </div>
                                    <div className="bg-gray-50 p-4 rounded-lg">
                                      <p className="text-sm text-gray-800">
                                        <span className="font-semibold">
                                          Recommendation:
                                        </span>{" "}
                                        {feedback.recommendation}
                                      </p>
                                    </div>
                                    <div className="bg-gray-50 p-4 rounded-lg">
                                      <p className="text-sm text-gray-800">
                                        <span className="font-semibold">
                                          Recommendation Message:
                                        </span>{" "}
                                        {feedback.recommendationMsg}
                                      </p>
                                    </div>
                                  </div>
                                );
                              })()
                            ) : (
                              <p className="text-sm text-gray-500 mt-4">
                                No feedback available.
                              </p>
                            )}
                          </div>
                        )}
                      </div>
                    </DialogContent>
                  </Dialog>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ScheduledInterviews;
