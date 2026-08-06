"use client";

import { useState } from "react";
import { redirect } from "next/navigation";
import { signUp } from "@/lib/auth-client";

export default function SignUpPage() {
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    const formData = new FormData(e.currentTarget);

    const res = await signUp.email({
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    });

    if (res.error) {
      setError(res.error.message || "Something went wrong.");
    } else {
      redirect("/dashboard");
    }
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gray-500">
      <main className="max-w-xl mx-auto p-6 space-y-4 bg-neutral-950 text-white rounded-4xl">
        <h1 className="text-2xl font-bold text-center">Sign Up</h1>
        {error && <p className="text-red-500">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          {" "}
          <input
            name="name"
            placeholder="Full Name"
            required
            className="w-full rounded-md bg-neutral-900 border border-neutral-700 px-3 py-2"
          />{" "}
          <input
            name="email"
            type="email"
            placeholder="Email"
            required
            className="w-full rounded-md bg-neutral-900 border border-neutral-700 px-3 py-2"
          />{" "}
          <input
            name="password"
            type="password"
            placeholder="Password"
            required
            minLength={8}
            className="w-full rounded-md bg-neutral-900 border border-neutral-700 px-3 py-2"
          />{" "}
          <button
            type="submit"
            className="w-full bg-white text-black font-medium rounded-md px-4 py-2 hover:bg-gray-200"
          >
            {" "}
            Create Account
          </button>{" "}
        </form>{" "}
      </main>
    </div>
  );
}
