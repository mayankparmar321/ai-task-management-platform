import { prisma } from "@/src/db";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";

export default async function ShowTask() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const email = session?.user.email;
  const userid = await prisma.user.findUnique({
    where: { email: email },
  });
  const tasks = await prisma.task.findMany({
    where: { authorId: userid?.id },
  });
  return (
    <div>
      <h1 className="text-center font-extrabold">Tasks:</h1>
      <div className="flex flex-wrap items-center justify-evenly gap-4">
        {tasks.map((task) => (
          <div
            className="block max-w-2xs text-center p-4 bg-gray-300 border-2 rounded-2xl wrap-break-word"
            key={task.id}
          >
            <h2 className="font-bold">{task.title}</h2>
            <p>{task.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
