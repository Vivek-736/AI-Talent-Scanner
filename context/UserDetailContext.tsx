import { createContext, Dispatch, SetStateAction } from "react";

interface User {
  id?: number;
  name: string;
  email: string;
  picture: string;
  credits?: number;
  created_at?: string;
}

interface UserDetailContextType {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
}

export const UserDetailContext = createContext<UserDetailContextType | null>(null);
