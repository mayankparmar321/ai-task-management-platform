import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { prisma } from "@/src/db";
import DeleteButton from "./delete-button";
import { Button } from "@/components/ui/button";
import EditTask from "./edit-task";

export default async function ShowTask() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const email = session?.user.email;
  const user = await prisma.user.findUnique({
    where: { email: email },
  });

  const tasks = await prisma.task.findMany({
    where: { authorId: user?.id },
    orderBy: { id: "desc" },
  });

  return (
    <div>
      <h1 className="text-center font-extrabold">Tasks:</h1>
      <div className="flex flex-wrap items-center justify-evenly gap-4">
        {tasks.map((task) => (
          <div
            className="block max-w-2xs text-center p-4 bg-neutral-950 text-white border-2 rounded-2xl wrap-break-word"
            key={task.id}
          >
            <EditTask
              id={task.id}
              title={task.title}
              description={task.description || ""}
            />
            <DeleteButton taskId={task.id} />
          </div>
        ))}
      </div>
    </div>
  );
}
