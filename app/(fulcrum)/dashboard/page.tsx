"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/app/Provider";
import CreateOptions from "@/components/CreateOptions";
import Welcome from "@/components/Welcome";

const DashboardPage = () => {
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!user?.name) {
      router.push("/");
    }
  }, [user, router]);

  return (
    <div>
      <Welcome />
      <h2 className="text-2xl font-bold ml-2 my-3 mt-6">Dashboard</h2>
      <CreateOptions />
    </div>
  );
};

export default DashboardPage;
