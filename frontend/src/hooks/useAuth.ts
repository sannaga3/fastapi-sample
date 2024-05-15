import { useLoading } from "@/hooks/common/useLoadingContext";
import { api } from "@/lib/apiClient";
import { useState } from "react";

const useAuth = () => {
  const { setLoading } = useLoading();
  const [error, setError] = useState<string | null>(null);

  const signUp = async (username: string, email: string, password: string) => {
    setLoading(true);
    setError(null);

    const res = await api("/auth/signup", "POST", {
      username,
      email,
      password,
    });
    const data = await res.json();

    setLoading(false);

    if (!res.ok) return setError(data.detail);
    return data;
  };

  const login = async (username: string, password: string) => {
    setLoading(true);
    setError(null);

    const res = await api(
      "/auth/login",
      "POST",
      { username, password },
      null,
      true
    );
    const data = await res.json();

    setLoading(false);

    if (!res.ok) return setError(data.detail);
    return data;
  };

  return { signUp, login, error };
};

export { useAuth };
