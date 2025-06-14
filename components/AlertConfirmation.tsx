'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import React, { useState } from 'react';
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';
import { useVapi } from '@/context/VapiContext';

interface AlertConfirmationProps {
  children: React.ReactNode;
  stopInterview: () => void;
  interviewId: string;
}

const AlertConfirmation = ({
  children,
  stopInterview,
  interviewId,
}: AlertConfirmationProps) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const vapi = useVapi();
  const [isCallStopping, setIsCallStopping] = useState(false);

  const handleContinue = async () => {
    if (isCallStopping) return;

    setIsCallStopping(true);

    try {
      stopInterview();

      await new Promise<void>((resolve) => {
        const onCallEnd = () => {
          vapi.removeListener('call-end', onCallEnd);
          resolve();
        };
        vapi.on('call-end', onCallEnd);

        setTimeout(() => {
          vapi.removeListener('call-end', onCallEnd);
          resolve();
        }, 3000);
      });

      setOpen(false);
      router.push(`/interview/${interviewId}/end`);
    } catch (error) {
      console.error('Failed to stop interview:', error);
      setIsCallStopping(false);
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure you want to end this?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. Your interview will be ended.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            variant="destructive"
            className="cursor-pointer"
            onClick={() => setOpen(false)}
            disabled={isCallStopping}
          >
            Cancel
          </Button>
          <Button
            className="cursor-pointer"
            onClick={handleContinue}
            disabled={isCallStopping}
          >
            {isCallStopping ? 'Stopping...' : 'Continue'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AlertConfirmation;
