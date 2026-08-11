"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/src/db";
import { TaskStatus } from "@/src/generated/prisma/enums";

export async function editStatusAction(id: string, status: TaskStatus) {
  await prisma.task.update({
    where: { id: id },
    data: { status },
  });
}
