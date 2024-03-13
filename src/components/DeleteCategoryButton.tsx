"use client";

import { FC, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { DialogTrigger, Dialog, DialogContent } from "@/lib/ui/dialog";
import { RxCross1 } from "react-icons/rx";
import { DeleteConfirm } from "./DeleteConfirm";

type PropsType = {
  categoryId: number;
};

export const DeleteCategoryButton: FC<PropsType> = ({ categoryId }) => {
  const router = useRouter();
  const [isOpenedModal, setIsOpenedModal] = useState(false);
  const handleModal = () => setIsOpenedModal((prev) => !prev);

  const onDelete = async (categoryId: number) => {
    try {
      const res = await fetch(`/api/category`, {
        body: JSON.stringify({ categoryId }),
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) return toast.error((await res.json()).message);

      toast.success((await res.json()).message);
      return router.refresh();
    } catch (error) {
      const serverError = error as any;
      return toast.error(serverError.message ?? "Ошибка сервера");
    }
  };

  const handleDeleteCategory = () => {
    onDelete(categoryId);
    setIsOpenedModal(false);
    router.refresh();
  };

  return (
    <Dialog open={isOpenedModal} onOpenChange={handleModal}>
      <DialogTrigger className="text-2xl">
        <RxCross1 />
      </DialogTrigger>

      <DialogContent>
        <DeleteConfirm onClose={handleModal} onDelete={handleDeleteCategory} />
      </DialogContent>
    </Dialog>
  );
};
