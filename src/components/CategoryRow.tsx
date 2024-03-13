import { FC } from "react";
import type { Category } from "@prisma/client";

type PropsType = {
  category: Category;
  editButton?: JSX.Element;
  deleteButton?: JSX.Element;
};

export const CategoryRow: FC<PropsType> = ({
  category,
  deleteButton,
  editButton,
}) => {
  return (
    <div className="flex items-center justify-between p-4 border-b-2 border-white last:border-0">
      <p>{category.name}</p>
      <div className="flex gap-3 items-center">
        {deleteButton}
        {editButton}
      </div>
    </div>
  );
};
