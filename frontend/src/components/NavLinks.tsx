"use client";

import { useAuthToken } from "@/hooks/common/useAuthTokenContext";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FC } from "react";
import Button from "./Button";

const NavLinks: FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { authToken, removeTokenFromLocalStorage } = useAuthToken();

  const deleteToken = () => {
    removeTokenFromLocalStorage();
    router.push(`/login?flash=ログアウトしました&type=success`);
  };

  return (
    <div className="mx-auto w-4/5">
      <nav className="flex justify-center items-center space-x-5 border-b border-black py-3">
        {authToken ? (
          <Button
            text="ログアウト"
            type="submit"
            color="black"
            useCustomClass={true}
            onClick={() => deleteToken()}
            classProps="hover:scale-105"
          />
        ) : (
          <>
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
          </>
        )}
      </nav>
    </div>
  );
};

export default NavLinks;
