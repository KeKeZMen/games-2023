"use client";

import { Dialog, DialogContent, DialogTrigger } from "@/lib/ui/dialog";
import toast from "react-hot-toast";
import type { Category } from "@prisma/client";
import { FC, useState } from "react";
import { CiEdit } from "react-icons/ci";
import { CategoryForm } from "./CategoryForm";

type PropsType = {
  category: Category;
};

export const EditCategoryButton: FC<PropsType> = ({ category }) => {
  const [isOpenedModal, setIsOpenedModal] = useState(false);
  const handleModal = () => setIsOpenedModal((prev) => !prev);

  const onSubmitAction = async (
    data: any,
    video: FileList | null | undefined
  ) => {
    const formData = new FormData();

    formData.append("id", String(category.id));
    formData.append("name", data.name);

    if (video) {
      formData.append("video", video[0]);
    }

    const res = await fetch("/api/category", {
      method: "PATCH",
      body: formData,
    });

    if (!res.ok) toast.error((await res.json()).message);
    if (res.ok) toast.success((await res.json()).message);
  };

  return (
    <Dialog open={isOpenedModal} onOpenChange={handleModal}>
      <DialogTrigger className="text-2xl">
        <CiEdit />
      </DialogTrigger>

      <DialogContent>
        <CategoryForm
          formTitle="Редактировать категорию"
          submitTitle="Редактирвать"
          onSubmitAction={onSubmitAction}
          category={category}
          onClose={handleModal}
        />
      </DialogContent>
    </Dialog>
  );
};
