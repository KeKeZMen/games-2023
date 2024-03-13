"use client";

import { Dialog, DialogContent, DialogTrigger } from "@/lib/ui/dialog";
import toast from "react-hot-toast";
import { CiSquarePlus } from "react-icons/ci";
import { ProductForm } from "./ProductForm";
import type { Product } from "@prisma/client";
import { FC } from "react";
import { CiEdit } from "react-icons/ci";

type PropsType = {
  product: Product;
};

export const EditProductButton: FC<PropsType> = ({ product }) => {
  const onSbumitAction = async (
    data: any,
    preview: File | undefined | null,
    images: FileList | undefined | null
  ) => {
    const formData = new FormData();

    formData.append("id", String(product.id));

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
      method: "PATCH",
      body: formData,
    });

    if (!res.ok) toast.error((await res.json()).message);
    if (res.ok) toast.success((await res.json()).message);
  };

  return (
    <Dialog>
      <DialogTrigger className="text-2xl">
        <CiEdit />
      </DialogTrigger>

      <DialogContent>
        <ProductForm
          formTitle="Редактировать игру"
          submitTitle="Редактирвать"
          onSubmitAction={onSbumitAction}
          product={product}
        />
      </DialogContent>
    </Dialog>
  );
};
