"use client";

import { useAuthContext } from "@/hooks/common/useAuthContext";
import { removeCookie } from "@/utils/cookies";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FC } from "react";
import Button from "./Button";

const NavLinks: FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { authToken, setToken, loginUser } = useAuthContext();

  const handleLogout = async () => {
    setToken(null);
    await removeCookie("task-app-token");
    router.push(`/login?flash=ログアウトしました&type=success`);
  };

  return (
    <div className="mx-auto w-4/5">
      <nav>
        {authToken ? (
          <div className="flex justify-between items-center border-b border-black p-3">
            <div className="flex justify-start items-center space-x-5">
              <Link
                className={`${
                  pathname === `/users/${loginUser?.id}/profile` ? "active" : ""
                } nav-link`}
                href={`/users/${loginUser?.id}/profile`}
              >
                プロフィール
              </Link>
              <Link
                className={`${
                  pathname === "/tasks/list" ? "active" : ""
                } nav-link`}
                href="/tasks/list"
              >
                タスク一覧
              </Link>
              <Button
                text="ログアウト"
                type="submit"
                color="black"
                useCustomClass={true}
                onClick={() => handleLogout()}
                classProps="hover:scale-105"
              />
            </div>
            <div className="text-sm">ユーザー: {loginUser?.username}</div>
          </div>
        ) : (
          <div className="flex justify-center items-center space-x-5 border-b border-black p-3">
            <Link
              className={`${pathname === "/signup" ? "active" : ""} nav-link`}
              href="/signup"
            >
              サインアップ
            </Link>

            <Link
              className={`${pathname === "/login" ? "active" : ""} nav-link`}
              href="/login"
            >
              ログイン
            </Link>
          </div>
        )}
      </nav>
    </div>
  );
};

export default NavLinks;
