"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/src/db";
import { TaskStatus } from "@/src/generated/prisma/enums";

export async function editTaskAction(
  id: string,
  title: string,
  description: string,
  status: TaskStatus,
) {
  await prisma.task.update({
    where: { id: id },
    data: { title, description, status },
  });

  revalidatePath("/dashboard");
}
