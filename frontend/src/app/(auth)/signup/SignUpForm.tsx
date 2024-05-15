import Button from "@/components/Button";
import FormErrorMessage from "@/components/FormErrorMessage";
import Input from "@/components/Input";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { FC } from "react";
import { useForm } from "react-hook-form";

const SignUpForm: FC = () => {
  const router = useRouter();
  const { error, signUp } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm({
    defaultValues: {
      username: "",
      email: "",
      password: "",
      password_confirm: "",
    },
    mode: "onSubmit",
    reValidateMode: "onSubmit",
  });
  const errorMessage = Object.keys(errors).length > 0 ? errors : error;

  const handleSignUp = async () => {
    const [username, email, password, _] = getValues([
      "username",
      "email",
      "password",
      "password_confirm",
    ]);

    const data = await signUp(username, email, password);
    if (data?.id)
      router.push(`/login?flash=アカウント登録に成功しました&type=success`);
  };

  return (
    <form onSubmit={handleSubmit(handleSignUp)}>
      <div className="flex flex-col items-center">
        <FormErrorMessage errorProp={errorMessage} />
        <div className="flex flex-col items-center space-y-5">
          <Input
            label="ユーザー名"
            name="username"
            type="username"
            minLen={2}
            register={register}
            required={true}
          />
          <Input
            label="メールアドレス"
            name="email"
            type="email"
            minLen={10}
            register={register}
            required={true}
          />
          <Input
            label="パスワード"
            name="password"
            type="password"
            register={register}
            required={true}
            minLen={6}
            trigger="password_confirm"
          />
          <Input
            label="パスワード確認"
            name="password_confirm"
            type="password"
            register={register}
            required={true}
            minLen={6}
            getValues={getValues}
            getValueKey={"パスワード"}
            trigger="password"
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

export default SignUpForm;
