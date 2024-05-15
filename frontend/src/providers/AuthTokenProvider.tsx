"use client";

import { AuthTokenContextProps } from "@/types/auth";
import {
  FC,
  PropsWithChildren,
  createContext,
  useEffect,
  useState,
} from "react";

export const AuthContext = createContext<AuthTokenContextProps>({
  authToken: null,
  setTokenToLocalStorage: (token: string) => {},
  getTokenFromLocalStorage: () => {},
  removeTokenFromLocalStorage: () => {},
});

export const AuthTokenProvider: FC<PropsWithChildren> = ({ children }) => {
  const [authToken, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("task-app-token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const setTokenToLocalStorage = (authToken: string) => {
    localStorage.setItem("task-app-token", authToken);
    setToken(authToken);
  };

  const getTokenFromLocalStorage = () => {
    return localStorage.getItem("task-app-token");
  };

  const removeTokenFromLocalStorage = () => {
    localStorage.removeItem("task-app-token");
    setToken(null);
  };

  return (
    <AuthContext.Provider
      value={{
        authToken,
        setTokenToLocalStorage,
        getTokenFromLocalStorage,
        removeTokenFromLocalStorage,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
