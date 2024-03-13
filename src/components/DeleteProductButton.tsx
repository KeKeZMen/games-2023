"use client";

import { FC, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { DialogTrigger, Dialog, DialogContent } from "@/lib/ui/dialog";
import { RxCross1 } from "react-icons/rx";
import { DeleteConfirm } from "./DeleteConfirm";

type PropsType = {
  productId: number;
};

export const DeleteProductButton: FC<PropsType> = ({ productId }) => {
  const router = useRouter();
  const [isOpenedModal, setIsOpenedModal] = useState(false);
  const handleModal = () => setIsOpenedModal((prev) => !prev);

  const onDelete = async (productId: number) => {
    try {
      const res = await fetch(`/api/product`, {
        body: JSON.stringify({ productId }),
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) return toast.error((await res.json()).message);

      toast.success((await res.json()).message);
      return router.refresh();
    } catch (error) {
      return toast.error("Ошибка сервера");
    }
  };

  const handleDeleteProduct = () => {
    onDelete(productId);
    setIsOpenedModal(false);
    router.refresh();
  };

  return (
    <Dialog open={isOpenedModal} onOpenChange={handleModal}>
      <DialogTrigger className="text-2xl">
        <RxCross1 />
      </DialogTrigger>

      <DialogContent>
        <DeleteConfirm onClose={handleModal} onDelete={handleDeleteProduct} />
      </DialogContent>
    </Dialog>
  );
};
