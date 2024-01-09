import IProduct from "@/lib/typecode/IProduct";
import Link from "next/link";
import React, { FC } from "react";

type PropsType = {
  product: IProduct;
};

export const ProductCard: FC<PropsType> = ({ product }) => {
  return <Link className="" href={`/product/${product.id}`}></Link>;
};
