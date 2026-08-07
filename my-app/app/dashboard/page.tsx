import DashboardPage from "@/src/sign-out";
import { prisma } from "@/src/db";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import Form from "next/form";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default async function Dashboard() {
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

  async function createTask(formData: FormData) {
    "use server";
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    await prisma.task.create({
      data: {
        title,
        description,
        authorId: userid ? userid.id : "24",
      },
    });

    revalidatePath("/dashboard");
    redirect("/dashboard");
  }

  return (
    <>
      <DashboardPage />
      <div className="w-2xs rounded-2xl m-2 p-2 content-center mx-auto border-2">
        <Form
          action={createTask}
          className="space-y-6 flex flex-col  items-center  justify-center"
        >
          <div>
            <label htmlFor="title" className="block text-center text-lg mb-2">
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              placeholder="Enter your title"
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>
          <div>
            <label
              htmlFor="description"
              className="block text-center text-lg mb-2"
            >
              Description
            </label>
            <textarea
              rows={4}
              id="description"
              name="description"
              placeholder="Enter your description"
              className="w-full px-4 py-2 border rounded-lg"
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-fit p-2 bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600"
          >
            Create Task
          </button>
        </Form>
      </div>
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
    </>
  );
}
