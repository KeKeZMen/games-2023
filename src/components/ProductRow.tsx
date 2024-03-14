import Link from "next/link";
import React, { FC } from "react";
import { IProductWithImages } from "@/lib/Interfaces";

type PropsType = {
  product: IProductWithImages;
};

export const ProductRow: FC<PropsType> = ({ product }) => {
  return (
    <Link
      href={`/product/${product.id}`}
      className="flex justify-between items-center bg-[hsl(var(--primary-foreground))] w-full"
    >
      <div className="flex gap-2 items-center w-full">
        <img
          src={product.images.find((i) => i.isPreview)?.link}
          className="h-20"
        />
        <h2 className="text-xs md:text-base">{product.name}</h2>
      </div>

      {product.discount !== 0 ? (
        <p className="mr-3">
          <span className="line-through mr-1">{product.price}$</span>
          {Math.ceil(product.price - (product.price / 100) * product.discount)}$
        </p>
      ) : (
        <p className="mr-3">{product.price}$</p>
      )}
    </Link>
  );
};
