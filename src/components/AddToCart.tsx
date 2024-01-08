"use client";

import { useRouter } from "next/navigation";
import React, { FC } from "react";
import toast from "react-hot-toast";

type PropsType = {
  productId: number;
};

export const AddToCart: FC<PropsType> = ({ productId }) => {
  const router = useRouter();

  const handleAddToCart = async () => {
    try {
      const res = await fetch("/api/order", {
        method: "POST",
        body: JSON.stringify({ id: productId }),
      });

      if (!res.ok) return toast.error((await res.json()).message);
      return router.refresh();
    } catch (error) {
      toast.error(`Ошибка: ${error}`);
    }
  };

  return <button onClick={handleAddToCart}>В корзину</button>;
};
