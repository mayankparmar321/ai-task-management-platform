"use client";

import { useRouter } from "next/navigation";
import { useSession, signOut } from "@/lib/auth-client";
import { useEffect } from "react";

export default function Header() {
  const router = useRouter();
  const { data: session, isPending } = useSession();

  useEffect(() => {
    if (!isPending && !session?.user) {
      router.push("/");
    }
  }, [isPending, session, router]);

  if (isPending)
    return <p className="text-center mt-8 text-white">Loading...</p>;
  if (!session?.user)
    return <p className="text-center mt-8 text-white">Redirecting...</p>;

  const { user } = session;

  return (
    <main className="w-full  flex justify-between items-center bg-black text-white p-4  ">
      <p className="">Email: {user.email}</p>
      <button
        onClick={() => signOut()}
        className="w-fit  bg-white text-black font-medium rounded-md px-4 py-2 hover:bg-gray-200"
      >
        Sign Out
      </button>
    </main>
  );
}
