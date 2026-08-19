"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import Form from "next/form";
import { editTaskAction } from "../_actions/edit-task";
import { editStatusAction } from "../_actions/edit-status";
import { TaskStatus } from "@/src/generated/prisma/enums";

export default function EditTask({
  id,
  title,
  description,
}: {
  id: string;
  title: string;
  description: string;
}) {
  const [isedit, setIsEdit] = useState(false);
  const [status, setStatus] = useState("TODO");
  let detailClass;
  let inputClass;
  let editOrSave;
  if (isedit) {
    detailClass = "hidden";
    editOrSave = "Save";
  } else {
    inputClass = "hidden";
    editOrSave = "Edit";
  }

  function changeEdit() {
    setIsEdit(!isedit);
  }
  const handleEdit = (formData: FormData) => {
    setIsEdit(!isedit);
    const newTitle = formData.get("title") as string;
    const newDescription = formData.get("description") as string;
    const Status = formData.get("status") as TaskStatus;
    editTaskAction(id, newTitle, newDescription, Status);
  };

  return (
    <>
      <div className={detailClass}>
        <h2 className="font-bold inline text-slate-50">{title}</h2>
        <p className="text-slate-500">{description}</p>
        <p className="font-bold ">{status}</p>
      </div>
      <div className={inputClass}>
        <Form action={handleEdit}>
          <input
            type="text"
            id="title"
            name="title"
            defaultValue={title}
            className="w-full px-4 py-2 border rounded-lg"
          />
          <textarea
            rows={4}
            id="description"
            name="description"
            defaultValue={description}
            className="w-full px-4 py-2 border rounded-lg"
          ></textarea>
          <select
            name="status"
            id="status"
            value={status}
            className="inline m-2 text-black bg-white"
            onChange={(e) => {
              setStatus(e.target.value);
            }}
          >
            <option value="TODO">TODO</option>
            <option value="IN_PROGRESS">IN_PROGRESS</option>
            <option value="IN_REVIEW">IN_REVIEW</option>
            <option value="DONE">DONE</option>
            <option value="ARCHIVED">ARCHIVED</option>
          </select>
          <Button
            className="bg-white text-black hover:bg-white hober:text-black"
            type="submit"
          >
            Save
          </Button>
        </Form>
      </div>
      <span className={detailClass}>
        <Button
          className="rounded-2xl p-2 bg-white text-black hover:bg-white hober:text-black"
          onClick={changeEdit}
        >
          Edit
        </Button>
      </span>
    </>
  );
}
