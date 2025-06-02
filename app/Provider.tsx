"use client";

import React, { useContext, useEffect, useState } from "react";
import { supabase } from "@/services/supabaseClient"
import { UserDetailContext } from "@/context/UserDetailContext";
/* eslint-disable @typescript-eslint/no-unused-vars */

function Provider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState();

    useEffect(() => {
        CreateNewUser();
    }, []);

    const CreateNewUser = () => {
        supabase.auth.getUser().then(async ({ data: { user } }) => {
            const { data: Users, error } = await supabase
                .from('Users')
                .select('*')
                .eq('email', user?.email)
            
            console.log(Users)

            if(Users?.length == 0) {
                const { data, error } = await supabase.from('Users')
                .insert([
                    {
                        name: user?.user_metadata?.name,
                        email: user?.email,
                        picture: user?.user_metadata?.picture
                    }
                ])
                console.log(data)

                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                setUser(data);
                return;
            }
            setUser(Users?.[0]);
        })
    }

    return (
        <UserDetailContext.Provider value={{ user, setUser }}>
            <div>
                {children}
            </div>
        </UserDetailContext.Provider>
    )
}

export default Provider;

export const useUser = () => {
    const context = useContext(UserDetailContext);
    return context;
}