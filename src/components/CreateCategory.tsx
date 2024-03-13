"use client";

import React from "react";
import { CiSquarePlus } from "react-icons/ci";
import { toast } from "react-hot-toast";
import { Dialog, DialogTrigger, DialogContent } from "@/lib/ui/dialog";
import { CategoryForm } from "./CategoryForm";

export const CreateCategoryButton = () => {
  const onSubmitAction = async (
    data: any,
    video: FileList | null | undefined
  ) => {
    const formData = new FormData();

    formData.append("name", data.name);

    if (video) {
      formData.append("video", video[0]);
    }

    const res = await fetch("/api/category", {
      method: "POST",
      body: formData,
    });

    if (!res.ok) toast.error((await res.json()).message);
    if (res.ok) toast.success((await res.json()).message);
  };

  return (
    <Dialog>
      <DialogTrigger className="text-[20px] gap-1 flex justify-between items-center">
        <div className="flex items-center">
          <CiSquarePlus />
          <p>Создать Категорию</p>
        </div>
      </DialogTrigger>

      <DialogContent>
        <CategoryForm
          formTitle="Добавить категорию"
          submitTitle="Добавить"
          onSubmitAction={onSubmitAction}
        />
      </DialogContent>
    </Dialog>
  );
};
