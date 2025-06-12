'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

interface AlertConfirmationProps {
  children: React.ReactNode;
  stopInterview: () => void;
  interviewId: string;
}

const AlertConfirmation = ({ children, stopInterview, interviewId }: AlertConfirmationProps) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleContinue = () => {
    stopInterview();
    setOpen(false);
    router.push(`/interview/${interviewId}`);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone, your interview will be ended.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            variant="destructive"
            className="cursor-pointer"
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>
          <Button className="cursor-pointer" onClick={handleContinue}>
            Continue
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AlertConfirmation;
