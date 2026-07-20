import Form from "next/form"
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from '../src/db'
export default async function Home() {
  
async function createTask(formData: FormData) {
    "use server";
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    await prisma.task.create({
      data: {
        title,
        description,
        authorId: 24,
      },
    });
    revalidatePath("/");
    redirect("/");
  }
  return (
    <div>
      <Form action={createTask} className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-lg mb-2">
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
          <label htmlFor="description" className="block text-lg mb-2">
            Description
          </label>
          <input
            type="text"
            id="description"
            name="description"
            placeholder="Enter your description"
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600"
        >
          Create Task
        </button>
      </Form>
    </div>
    
  );
}

Home()
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })