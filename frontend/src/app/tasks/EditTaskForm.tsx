"use client";

import Button from "@/components/Button";
import FormErrorMessage from "@/components/FormErrorMessage";
import Input from "@/components/Input";
import RadioButton from "@/components/RadioButton";
import { TASK_STATUS } from "@/constants/task";
import { useTasks } from "@/hooks/useTasks";
import { Task } from "@/types/task";
import { useRouter } from "next/navigation";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";

type EditTaskProps = {
  task: Task;
};

const EditTaskForm: FC<EditTaskProps> = ({ task }) => {
  const router = useRouter();
  const { updateTask, error } = useTasks();
  const initialStatusObj = TASK_STATUS.find(
    (statusObj) => statusObj.value === task.status
  );
  const [selectedStatus, setSelectedStatus] = useState(initialStatusObj!.value);

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    reset,
  } = useForm({
    defaultValues: {
      title: task.title,
      content: task.content,
      status: task.status,
    },
    mode: "onSubmit",
    reValidateMode: "onSubmit",
  });
  const errorMessage = Object.keys(errors).length > 0 ? errors : error;

  const UpdateTaskHandler = async () => {
    const [title, content, status] = getValues(["title", "content", "status"]);

    const updatedTask = await updateTask(task.id, {
      title: title,
      content: content,
      status: status,
    });
    if (updatedTask?.id) {
      reset();
      router.push(`/tasks/list/?flash=タスクを更新しました&type=success`);
    }
  };

  return (
    <form onSubmit={handleSubmit(UpdateTaskHandler)}>
      <div className="flex flex-col items-center">
        <FormErrorMessage errorProp={errorMessage} />
        <div className="flex flex-col items-start space-y-3">
          <Input
            label="タイトル"
            name="title"
            type="title"
            minLen={2}
            register={register}
            required={true}
          />
          <Input
            label="内容"
            name="content"
            type="content"
            minLen={2}
            register={register}
            required={true}
          />
          <div className="pt-3">
            <RadioButton
              label="ステータス"
              name="status"
              register={register}
              selectable={TASK_STATUS}
              selected={selectedStatus}
              setSelected={setSelectedStatus}
            />
          </div>
        </div>

        <Button
          text="送信"
          type="submit"
          color="primary"
          width={150}
          classProps="mt-5 mb-3"
        />
      </div>
    </form>
  );
};

export default EditTaskForm;
