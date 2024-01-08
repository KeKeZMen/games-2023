"use client";

import { useRouter } from "next/navigation";
import React, { FC } from "react";
import toast from "react-hot-toast";

type PropsType = {
  productId: number;
};

export const RemoveFromCartButton: FC<PropsType> = ({ productId }) => {
  const router = useRouter();

  const handleRemoveFromCart = async () => {
    try {
      const res = await fetch("/api/order", {
        method: "DELETE",
        body: JSON.stringify({ id: productId }),
      });

      if (!res.ok) return toast.error((await res.json()).message);
      return router.refresh();
    } catch (error) {
      toast.error(`Ошибка: ${error}`);
    }
  };

  return <button onClick={handleRemoveFromCart} className="text-xs md:text-base">Удалить из корзины</button>;
};
