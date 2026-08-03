import DashboardPage from "@/src/sign-out";
import { prisma } from '@/src/db'
import { headers } from "next/headers";
import { auth } from "@/lib/auth";

export default async function Dashboard() {

   const session = await auth.api.getSession({
    headers: await headers(),
  });

  const email = session?.user.email;
  const userid = await prisma.user.findUnique({
    where:{ email: email}
  })
     const tasks = await prisma.task.findMany({
    where:{authorId: userid?.id},
  })

  return (
    <>
    <div>
        <h1>Tasks:</h1>
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              {task.title}:{task.description}
            </li>
          ))}
        </ul>
      </div>
    <DashboardPage />
    </>
  );
}

