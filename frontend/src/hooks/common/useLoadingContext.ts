import { LoadingContext } from "@/providers/LoadingProvider";
import { useContext } from "react";

export const useLoading = () => {
  const context = useContext(LoadingContext);
  return context;
};
