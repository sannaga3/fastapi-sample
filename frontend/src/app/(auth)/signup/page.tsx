"use client";

import { FC } from "react";
import SignUpForm from "./SignUpForm";

const LoginPage: FC = () => {
  return (
    <div className="flex flex-col items-center space-y-5">
      <h1 className="text-2xl font-semibold">サインアップ</h1>
      <SignUpForm />
    </div>
  );
};

export default LoginPage;
