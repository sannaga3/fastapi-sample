import Link from "next/link";

export default function Home() {
  const linkStyle =
    "flex flex-col border border-slate-700 rounded-lg text-lg p-5 hover:scale-110";

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-2xl font-semibold">トップページ</h1>
      <div className="flex justify-around space-x-10 mt-10">
        <Link href="/login" className={linkStyle}>
          ログインする
        </Link>
        <Link href="/signup" className={linkStyle}>
          サインアップする
        </Link>
      </div>
    </div>
  );
}
