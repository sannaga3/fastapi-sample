"use client";

import { LoadingContextProps } from "@/types/auth";
import {
  Dispatch,
  FC,
  PropsWithChildren,
  SetStateAction,
  createContext,
  useState,
} from "react";

export const LoadingContext = createContext<LoadingContextProps>({
  isLoading: false,
  setLoading: () => {},
});

export const LoadingProvider: FC<PropsWithChildren> = ({ children }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const setLoading: Dispatch<SetStateAction<boolean>> = (loading) => {
    setIsLoading(loading);
  };

  return (
    <LoadingContext.Provider value={{ isLoading, setLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};
