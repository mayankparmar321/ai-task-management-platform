import Header from "./_components/Header";
import CreatetaskForm from "./_components/create-task-form";
import ShowTask from "./_components/show-task";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { prisma } from "@/src/db";
export default async function Dashboard() {
  return (
    <>
      <Header />
      <div className="flex">
        <CreatetaskForm />
        <ShowTask />
      </div>
    </>
  );
}
