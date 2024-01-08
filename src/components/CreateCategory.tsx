"use client";

import React from "react";
import { CiSquarePlus } from "react-icons/ci";
import { toast } from "react-hot-toast";
import { Dialog, DialogTrigger, DialogContent } from "@/lib/ui/dialog";
import { CategoryForm } from "./CategoryForm";

export const CreateCategoryButton = () => {
  const onSubmitAction = async (data: any) => {
    const res = await fetch("/api/category", {
      method: "POST",
      body: JSON.stringify(data),
    });

    if (!res.ok) toast.error((await res.json()).message);
    else toast.success((await res.json()).message);
  };

  return (
    <Dialog>
      <DialogTrigger className="text-[20px] gap-1 flex justify-between items-center">
        <CiSquarePlus />
        <p>Создать Категорию</p>
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
