import React, { FC } from "react";
import type { Product } from "@prisma/client";
import Link from "next/link";

type PropsType = {
  searchedProduct: Product;
  onClick?: () => void;
};

export const SearchedProducts: FC<PropsType> = ({
  searchedProduct,
  onClick,
}) => {
  return (
    <div className="flex justify-between p-3 text-black border-b-2 border-black last:border-0">
      <Link
        href={`/product/${searchedProduct.id}`}
        onClick={onClick}
        className="text-center w-full text-xl"
      >
        {searchedProduct.name}
      </Link>
    </div>
  );
};
