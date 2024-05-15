import Button from "@/components/Button";
import FormErrorMessage from "@/components/FormErrorMessage";
import Input from "@/components/Input";
import { useAuthToken } from "@/hooks/common/useAuthTokenContext";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { FC } from "react";
import { useForm } from "react-hook-form";

const LoginForm: FC = () => {
  const router = useRouter();
  const { error, login } = useAuth();
  const { setTokenToLocalStorage } = useAuthToken();

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
    mode: "onSubmit",
    reValidateMode: "onSubmit",
  });
  const errorMessage = Object.keys(errors).length > 0 ? errors : error;

  const handleLogin = async () => {
    const [username, password] = getValues(["username", "password"]);
    const data = await login(username, password);
    const authToken = data?.access_token || null;
    if (authToken) {
      setTokenToLocalStorage(authToken);
      router.push(`/tasks/list?flash=ログインに成功しました&type=success`);
    } else {
      router.push(`/login`);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleLogin)}>
      <div className="flex flex-col items-center">
        <FormErrorMessage errorProp={errorMessage} />
        <div className="flex flex-col items-center space-y-5">
          <Input
            label="ユーザー名"
            name="username"
            type="username"
            register={register}
            required={true}
          />
          <Input
            label="パスワード"
            name="password"
            type="password"
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

export default LoginForm;
