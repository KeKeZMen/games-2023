import { CreateCategoryButton } from "@/components/CreateCategory";
import { CreateProductButton } from "@/components/CreateProduct";
import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";
import { prisma } from "@/lib/prisma";
import { FilterSelects } from "@/components/FilterSelects";
import { AdminProductRow } from "@/components/AdminProductRow";
import { DeleteProductButton } from "@/components/DeleteProductButton";
import { CategoryRow } from "@/components/CategoryRow";
import { EditProductButton } from "@/components/EditProductButton";
import { PaginationNav } from "@/components/PaginationNav";
import { DeleteCategoryButton } from "@/components/DeleteCategoryButton";
import { EditCategoryButton } from "@/components/EditCategoryButton";

type SearchParamsType = {
  page: string;
  startCost: string;
  finalCost: string;
  categoryId: string;
};

type FilterType = {
  AND: Array<{
    [key: string]: {
      [key: string]: string | number;
    };
  }>;
};

export default async function AdminPage({
  searchParams,
}: {
  searchParams: SearchParamsType;
}) {
  const session = await getServerSession(authOptions);
  if (session?.user?.id !== "clpl6gb7e000008l45rq9dsxy") return redirect("/");

  if (Object.values(searchParams).length < 4) {
    redirect("/admin?page=0&categoryId=all&startCost=0&finalCost=1000");
  }

  const where: FilterType = {
    AND: [
      {
        price: {
          gt: Number(searchParams.startCost),
        },
      },
      {
        price: {
          lte: Number(searchParams.finalCost),
        },
      },
    ],
  };

  if (searchParams.categoryId !== "all") {
    where.AND.push({
      categoryId: {
        equals: Number(searchParams.categoryId),
      },
    });
  }

  const productsCount = await prisma.product.count({
    where
  });

  const products = await prisma.product.findMany({
    take: 10,
    skip: Number(searchParams.page) * 10,
    select: {
      categoryId: true,
      description: true,
      id: true,
      images: true,
      name: true,
      price: true,
      discount: true
    },
    where,
  });
  const categories = await prisma.category.findMany();

  return (
    <div className="flex gap-3 md:p-0 flex-col-reverse md:flex-row md:container">
      <div className="flex flex-col gap-3 md:w-[50%]">
        <CreateProductButton />
        <div className="flex flex-col rounded-md border-2 border-white">
          {products.map((product) => (
            <AdminProductRow
              key={product.id}
              product={product}
              deleteButton={<DeleteProductButton productId={product.id} />}
              editButton={<EditProductButton product={product} />}
            />
          ))}
        </div>
        <FilterSelects alwaysMobile />
        <PaginationNav productsCount={productsCount} />
      </div>
      <div className="flex flex-col gap-3 md:w-[50%]">
        <CreateCategoryButton />
        <div className="flex flex-col rounded-md border-2 border-white">
          {categories.map((category) => (
            <CategoryRow
              category={category}
              key={category.id}
              deleteButton={<DeleteCategoryButton categoryId={category.id} />}
              editButton={<EditCategoryButton category={category} />}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
