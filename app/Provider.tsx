"use client";

import React, { useContext, useEffect, useState } from "react";
import { supabase } from "@/services/supabaseClient";
import { UserDetailContext } from "@/context/UserDetailContext";

interface User {
  id?: number;
  name: string;
  email: string;
  picture: string;
  credits?: number;
  created_at?: string;
}

function Provider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    CreateNewUser();
  }, []);

  const CreateNewUser = async () => {
    try {
      const { data: authUser, error: authError } = await supabase.auth.getUser();
      if (authError || !authUser?.user) {
        console.error("Error fetching auth user:", authError);
        return;
      }

      const { data: users, error: fetchError } = await supabase
        .from("Users")
        .select("*")
        .eq("email", authUser.user.email);

      if (fetchError) {
        console.error("Error fetching user from Users table:", fetchError);
        return;
      }

      console.log("Fetched users:", users);

      if (users?.length === 0) {
        const { data: newUser, error: insertError } = await supabase
          .from("Users")
          .insert([
            {
              name: authUser.user.user_metadata?.name || "Unknown",
              email: authUser.user.email,
              picture: authUser.user.user_metadata?.picture || "",
            },
          ])
          .select()
          .single();

        if (insertError) {
          console.error("Error inserting new user:", insertError);
          return;
        }

        console.log("Inserted new user:", newUser);
        setUser(newUser);
        return;
      }

      setUser(users[0]);
    } catch (error) {
      console.error("Unexpected error in CreateNewUser:", error);
    }
  };

  return (
    <UserDetailContext.Provider value={{ user, setUser }}>
      <div>{children}</div>
    </UserDetailContext.Provider>
  );
}

export default Provider;

export const useUser = () => {
  const context = useContext(UserDetailContext);
  if (!context) {
    throw new Error("useUser must be used within a Provider");
  }
  
  return context;
};