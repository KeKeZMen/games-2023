import Link from "next/link";
import { FC } from "react";
import type { Product } from "@prisma/client";

type PropsType = {
  product: Product;
  deleteButton?: JSX.Element;
  editButton?: JSX.Element;
};

export const AdminProductRow: FC<PropsType> = ({
  product,
  deleteButton,
  editButton,
}) => {
  return (
    <div className="flex justify-between items-center p-4 border-b-2 border-white last:border-0">
      <Link href={`/product/${product.id}`}>{product.name}</Link>

      <div className="flex gap-2 items-center">
        <p>{product.price}$</p>
        <div className="flex justify-center items-center">
          {deleteButton}
          {editButton}
        </div>
      </div>
    </div>
  );
};
