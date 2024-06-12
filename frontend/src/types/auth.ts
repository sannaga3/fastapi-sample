import { Dispatch, SetStateAction } from "react";

export type LoadingContextProps = {
  isLoading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
};

export type AuthContextProps = {
  authToken: string | null;
  setToken: Dispatch<SetStateAction<string | null>>;
  loginUser: LoginUser | null;
  setLoginUser: Dispatch<SetStateAction<LoginUser | null>>;
};

export type LoginUser = {
  id: number;
  username: string;
  email: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
};
