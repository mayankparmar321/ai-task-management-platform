"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/src/db";

export async function deleteTaskAction(id: string) {
  await prisma.task.delete({
    where: { id: id },
  });
  revalidatePath("/dashboard");
}
