"use client";

import FlashMessage from "@/components/FlashMessage";
import { useSearchParams } from "next/navigation";
import { FC } from "react";
import LoginForm from "./LoginForm";

const LoginPage: FC = () => {
  const searchParams = useSearchParams();

  return (
    <div className="flex flex-col items-center space-y-5">
      <h1 className="text-2xl font-semibold">ログイン</h1>
      <FlashMessage
        flashMessage={{
          message: searchParams.get("flash"),
          type: searchParams.get("type"),
        }}
      />
      <LoginForm />
    </div>
  );
};

export default LoginPage;
