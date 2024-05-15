"use client";

import Button from "@/components/Button";
import FormErrorMessage from "@/components/FormErrorMessage";
import Input from "@/components/Input";
import { useTasks } from "@/hooks/useTasks";
import { useRouter } from "next/navigation";
import { FC } from "react";
import { useForm } from "react-hook-form";

const CreateTaskForm: FC = () => {
  const router = useRouter();
  const { storeTask, error } = useTasks();

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    reset,
  } = useForm({
    defaultValues: {
      title: "",
      content: "",
    },
    mode: "onSubmit",
    reValidateMode: "onSubmit",
  });
  const errorMessage = Object.keys(errors).length > 0 ? errors : error;

  const handleStoreTask = async () => {
    const [title, content] = getValues(["title", "content"]);

    const task = await storeTask({ title: title, content: content });
    if (task?.id) {
      reset();
      router.push(`/tasks/list?flash=タスクを作成しました&type=success`);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleStoreTask)}>
      <div className="flex flex-col items-center">
        <FormErrorMessage errorProp={errorMessage} />
        <div className="flex flex-col items-center space-y-5">
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
        </div>

        <Button
          text="送信"
          type="submit"
          color="primary"
          width={150}
          classProps="mt-10"
        />
      </div>
    </form>
  );
};

export default CreateTaskForm;
