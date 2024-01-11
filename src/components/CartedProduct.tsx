import Link from "next/link";
import { FC } from "react";
import type { Product } from "@prisma/client";

type PropsType = {
  product: Product;
  RemoveFromCart: JSX.Element;
};

export const CartedProduct: FC<PropsType> = ({ product, RemoveFromCart }) => {
  return (
    <div className="flex justify-between items-center p-4 border-b-2 last:border-0">
      <Link href={`/product/${product.id}`}>{product.name}</Link>

      <div className="flex gap-2 items-center">
        <p>{product.price}$</p>
        <div className="bg-red-500 rounded-md p-1 flex justify-center items-center">
          {RemoveFromCart}
        </div>
      </div>
    </div>
  );
};
