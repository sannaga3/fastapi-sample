"use client";

import { useAuth } from "@/hooks/useAuth";
import { AuthContextProps, LoginUser } from "@/types/auth";
import { getCookie } from "@/utils/cookies";
import {
  FC,
  PropsWithChildren,
  createContext,
  useEffect,
  useState,
} from "react";

export const AuthContext = createContext<AuthContextProps>({
  authToken: null,
  setToken: () => {},
  loginUser: null,
  setLoginUser: () => {},
});

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const [authToken, setToken] = useState<string | null>(null);
  const [loginUser, setLoginUser] = useState<LoginUser | null>(null);
  const { findMe } = useAuth();

  useEffect(() => {
    const storedToken = getCookie("task-app-token");

    if (storedToken) setToken(storedToken);
  }, []);

  useEffect(() => {
    if (authToken) {
      (async () => {
        const data = await findMe(authToken);

        if (data?.id) {
          setLoginUser(data);
        }
      })();
    }
  }, [authToken]);

  return (
    <AuthContext.Provider
      value={{
        authToken,
        setToken,
        loginUser,
        setLoginUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
