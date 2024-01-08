import { CreateCategoryButton } from "@/components/CreateCategory";
import { CreateProductButton } from "@/components/CreateProduct";
import React from "react";

export default async function page() {
  return (
    <div className="flex justify-around items-center w-full">
      <CreateCategoryButton />
      <CreateProductButton />
    </div>
  );
}
