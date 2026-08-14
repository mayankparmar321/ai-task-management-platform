"use client";

import { Button } from "@/components/ui/button";
import { deleteTaskAction } from "../_actions/delete-task";

export default function DeleteButton({ taskId }: { taskId: string }) {
  const handleDelete = () => {
    deleteTaskAction(taskId);
  };
  return (
    <>
      <Button
        onClick={handleDelete}
        className="rounded-2xl p-2 bg-white text-black hover:bg-white hober:text-black"
      >
        Delete
      </Button>
    </>
  );
}
