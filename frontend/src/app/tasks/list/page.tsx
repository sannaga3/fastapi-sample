"use client";

import Button from "@/components/Button";
import FlashMessage from "@/components/FlashMessage";
import FormErrorMessage from "@/components/FormErrorMessage";
import Modal from "@/components/Modal";
import { useTasks } from "@/hooks/useTasks";
import { Task, TaskList } from "@/types/task";
import { useRouter, useSearchParams } from "next/navigation";
import { FC, useEffect, useState } from "react";
import CreateTaskForm from "../CreateTaskForm";
import EditTaskForm from "../EditTaskForm";
import TaskItem from "./TaskItem";

const TaskListPage: FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { getTasks, deleteTask, error } = useTasks();
  const [tasks, setTasks] = useState<TaskList>([]);
  const [modalType, setModalType] = useState<string | null>(null);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  useEffect(() => {
    const fetchTasks = async () => {
      const data = await getTasks();
      if (data && data[0]?.id) setTasks(data);
    };
    fetchTasks();
  }, []);

  const closeModal = () => {
    setModalType(null);
    setSelectedTask(null);
  };

  const handleModal = (type: string, task: Task | null = null) => {
    if (
      (type === "update" && selectedTask?.id === task?.id) ||
      (type === "create" && modalType === "create")
    )
      return closeModal();

    setSelectedTask(task);
    setModalType(type);
  };

  const handleDelete = async (taskId: number) => {
    const confirmed = window.confirm("本当に削除しますか？");
    if (confirmed) {
      const deletedTask = await deleteTask(taskId);

      if (deletedTask?.id) {
        setModalType(null);
        router.push(`/tasks/list/?flash=タスクを削除しました&type=success`);
      }
    }
  };

  return (
    <>
      <div className="flex flex-col items-center mt-5">
        <h1 className="text-2xl font-semibold pb-3">タスク一覧</h1>
        <FlashMessage
          flashMessage={{
            message: searchParams.get("flash"),
            type: searchParams.get("type"),
          }}
        />
        <FormErrorMessage errorProp={error} />
      </div>
      <div className="w-5/6 flex justify-end mb-3">
        <Button
          text="タスク作成"
          type="button"
          onClick={() => {
            handleModal("create");
          }}
          color="primary"
          width={150}
        />
      </div>
      <div className="flex flex-col items-center space-y-5">
        <Modal
          isShow={modalType !== null ? true : false}
          closeModal={closeModal}
          sizeProps={{ width: "80%", height: "auto" }}
        >
          {modalType === "create" ? (
            <CreateTaskForm />
          ) : (
            <>
              {selectedTask && (
                <EditTaskForm key={selectedTask.id} task={selectedTask} />
              )}
            </>
          )}
        </Modal>
        <div className="w-4/5 flex justify-start text-left font-semibold space-x-4 border-b-2 border-black text-slate-700 px-4 pt-6 pb-2">
          <div className="flex-1">ID</div>
          <div className="flex-1">タイトル</div>
          <div className="flex-1">内容</div>
          <div className="flex-1">ステータス</div>
          <div className="flex-1">更新</div>
          <div className="flex-1">削除</div>
        </div>
        {tasks.length > 0 && (
          <div className="w-full flex flex-col items-center">
            {tasks.map((task: Task, index) => (
              <TaskItem
                task={task}
                key={index}
                handleUpdateModal={() => handleModal("update", task)}
                handleDelete={() => handleDelete(task.id)}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default TaskListPage;
