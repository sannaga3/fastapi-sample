import { AuthContext } from "@/providers/AuthTokenProvider";
import { useContext } from "react";

export const useAuthToken = () => {
  const context = useContext(AuthContext);
  return context;
};
