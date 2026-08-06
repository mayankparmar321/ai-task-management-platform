"use client";

import { useRouter } from "next/navigation";
export default function Home() {
  const router = useRouter();

  return (
    <div>
      <main className="flex flex-col items-center justify-center h-screen bg-neutral-950 text-white">
        <h1 className="w-full text-center text-5xl font-semibold tracking-tight text-balance text-gray-900 sm:text-7xl dark:text-white m-10">
          AI Task Management App
        </h1>
        <div className="flex gap-4">
          <button
            onClick={() => router.push("/sign-up")}
            className="bg-white text-black font-medium px-6 py-2 rounded-md hover:bg-gray-200"
          >
            Sign Up
          </button>
          <button
            onClick={() => router.push("/sign-in")}
            className="border border-white text-white font-medium px-6 py-2 rounded-md hover:bg-neutral-800"
          >
            Sign In
          </button>
        </div>
      </main>
    </div>
  );
}

// Home()
//   .catch((error) => {
//     console.error(error)
//     process.exit(1)
//   })
//   .finally(async () => {
//     await prisma.$disconnect()
//   })
