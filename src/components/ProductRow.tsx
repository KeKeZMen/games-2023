import IProduct from "@/lib/typecode/IProduct";
import Link from "next/link";
import React, { FC } from "react";

type PropsType = {
  product: IProduct;
};

export const ProductRow: FC<PropsType> = ({ product }) => {
  return (
    <Link
      href={`/product/${product.id}`}
      className="flex justify-between items-center bg-[hsl(var(--primary-foreground))] w-full"
    >
      <div className="flex gap-2 items-center w-full">
        <img src={product.links.split(",")[0]} className="h-20" />
        <h2 className="text-xs md:text-base">{product.name}</h2>
      </div>

      <p className="mr-3">{product.price}$</p>
    </Link>
  );
};
