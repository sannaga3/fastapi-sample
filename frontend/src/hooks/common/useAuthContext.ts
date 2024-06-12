import { AuthContext } from "@/providers/AuthProvider";
import { useContext } from "react";

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  return context;
};
