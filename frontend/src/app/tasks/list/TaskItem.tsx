"use client";

import Button from "@/components/Button";
import { Task } from "@/types/task";
import { FC } from "react";

type TaskItemProps = {
  task: Task;
  handleUpdateModal: (type: string, task?: Task | null) => void;
  handleDelete: (taskId: number) => void;
};

const TaskItem: FC<TaskItemProps> = ({
  task,
  handleUpdateModal,
  handleDelete,
}) => {
  return (
    <div className="w-4/5 flex justify-start items-center text-left space-x-4 border-b-2 border-slate-400 text-slate-700 px-4 py-3">
      <div className="flex-1">{task.id}</div>
      <div className="flex-1">{task.title}</div>
      <div className="flex-1">{task.content}</div>
      <div className="flex-1">{task.status}</div>
      <div className="flex-1">
        <Button
          text="更新"
          type="button"
          onClick={() => {
            handleUpdateModal("update", task);
          }}
          textSize="sm"
          color="orange"
          width={60}
        />
      </div>
      <div className="flex-1">
        <Button
          text="削除"
          type="button"
          onClick={() => {
            handleDelete(task.id);
          }}
          textSize="sm"
          color="red"
          width={60}
        />
      </div>
    </div>
  );
};

export default TaskItem;
