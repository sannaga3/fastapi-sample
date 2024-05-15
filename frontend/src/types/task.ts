export type Task = {
  id: number;
  title: string;
  content: string;
  status: string;
  user_id: number;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
};

export type TaskList = Task[];

export type StoreTaskRequest = {
  title: string;
  content: string;
};

export type UpdateTaskRequest = {
  title: string;
  content: string;
  status: string;
};
