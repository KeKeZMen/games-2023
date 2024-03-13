"use client";

import { Dialog, DialogContent, DialogTrigger } from "@/lib/ui/dialog";
import toast from "react-hot-toast";
import { CiSquarePlus } from "react-icons/ci";
import { ProductForm } from "./ProductForm";
import { useState } from "react";

export const CreateProductButton = () => {
  const [isOpenedModal, setIsOpenedModal] = useState(false);
  const handleModal = () => setIsOpenedModal((prev) => !prev);

  const onSbumitAction = async (
    data: any,
    preview: File | undefined | null,
    images: FileList | undefined | null
  ) => {
    const formData = new FormData();

    for (const key in data) {
      formData.append(key, data[key]);
    }

    if (preview) {
      formData.append("preview", preview);
    }

    if (images) {
      Array.from(images).forEach((image) => {
        formData.append("image", image);
      });
    }

    const res = await fetch("/api/product", {
      method: "POST",
      body: formData,
    });

    if (!res.ok) toast.error((await res.json()).message);
    if (res.ok) toast.success((await res.json()).message);
  };

  return (
    <Dialog open={isOpenedModal} onOpenChange={handleModal}>
      <DialogTrigger className="text-[20px] gap-1 flex justify-between items-center">
        <div className="flex justify-center gap-3 items-center">
          <CiSquarePlus />
          <p>Создать продукт</p>
        </div>
      </DialogTrigger>

      <DialogContent>
        <ProductForm
          formTitle="Добавить игру"
          submitTitle="Добавить"
          onSubmitAction={onSbumitAction}
          onClose={handleModal}
        />
      </DialogContent>
    </Dialog>
  );
};
