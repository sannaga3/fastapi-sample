import { Dispatch, SetStateAction } from "react";

export type LoadingContextProps = {
  isLoading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
};

export type AuthTokenContextProps = {
  authToken: string | null;
  setTokenToLocalStorage: (token: string) => void;
  getTokenFromLocalStorage: () => void;
  removeTokenFromLocalStorage: () => void;
};
