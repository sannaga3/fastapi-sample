"use client";

import { useAuthContext } from "@/hooks/common/useAuthContext";
import { FC } from "react";

const ProfilePage: FC = () => {
  const { loginUser } = useAuthContext();

  return (
    <div className="flex flex-col items-center space-y-5">
      <h1 className="text-2xl font-semibold">プロフィール</h1>
      <div className="flex justify-start pt-3">
        <div className="w-36">ユーザー名 :</div>
        <div className="w-36">{loginUser?.username}</div>
      </div>
      <div className="flex justify-start">
        <div className="w-36">メールアドレス :</div>
        <div className="w-36">{loginUser?.email}</div>
      </div>
    </div>
  );
};

export default ProfilePage;
