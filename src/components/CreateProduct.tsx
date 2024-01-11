"use client";

import { Dialog, DialogContent, DialogTrigger } from "@/lib/ui/dialog";
import toast from "react-hot-toast";
import { CiSquarePlus } from "react-icons/ci";
import { ProductForm } from "./ProductForm";

export const CreateProductButton = () => {
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
    <Dialog>
      <DialogTrigger className="text-[20px] gap-1 flex justify-between items-center">
        <CiSquarePlus />
        <p>Создать продукт</p>
      </DialogTrigger>

      <DialogContent>
        <ProductForm
          formTitle="Добавить игру"
          submitTitle="Добавить"
          onSubmitAction={onSbumitAction}
        />
      </DialogContent>
    </Dialog>
  );
};
