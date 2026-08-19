import Form from "next/form";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/src/db";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";

export default async function CreatetaskForm() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const email = session?.user.email;
  const userid = await prisma.user.findUnique({
    where: { email: email },
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
    <div className="w-2xs sm:w-2xl sm:h-fit rounded-2xl mx-auto p-2 content-center  border-2 bg-neutral-950 text-white">
      <Form
        action={createTask}
        className="space-y-6 flex flex-col   items-center  justify-center"
      >
        <div className="w-full">
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
        <div className="w-full">
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
          className="w-fit p-2 bg-white text-black py-3 rounded-lg hover:bg-blue-600"
        >
          Create Task
        </button>
      </Form>
    </div>
  );
}
