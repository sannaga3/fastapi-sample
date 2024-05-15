import { useLoading } from "@/hooks/common/useLoadingContext";
import { api } from "@/lib/apiClient";
import { useState } from "react";
import { StoreTaskRequest, UpdateTaskRequest } from "./../types/task";
import { useAuthToken } from "./common/useAuthTokenContext";

const useTasks = () => {
  const { setLoading } = useLoading();
  const { authToken } = useAuthToken();
  const [error, setError] = useState<string | null>(null);

  const getTasks = async () => {
    setLoading(true);
    setError(null);

    const res = await api("/tasks", "GET");
    const data = await res.json();

    setLoading(false);

    if (!res.ok) return setError(data.detail);
    return data;
  };

  const storeTask = async (storeParams: StoreTaskRequest) => {
    setLoading(true);
    setError(null);

    const res = await api("/tasks", "POST", storeParams, authToken);
    const data = await res.json();

    setLoading(false);

    if (!res.ok) return setError(data.detail);
    return data;
  };

  const updateTask = async (id: number, updateParams: UpdateTaskRequest) => {
    setLoading(true);
    setError(null);

    const res = await api(`/tasks/${id}`, "PUT", updateParams, authToken);
    const data = await res.json();

    setLoading(false);

    if (!res.ok) return setError(data.detail);
    return data;
  };

  const deleteTask = async (id: number) => {
    setLoading(true);
    setError(null);

    const res = await api(`/tasks/${id}`, "DELETE", null, authToken);
    const data = await res.json();

    setLoading(false);

    if (!res.ok) return setError(data.detail);
    return data;
  };

  return { getTasks, storeTask, updateTask, deleteTask, error };
};

export { useTasks };
