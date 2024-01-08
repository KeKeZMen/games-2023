import { FilterSelects } from "@/components/FilterSelects";
import { PaginationNav } from "@/components/PaginationNav";
import { ProductRow } from "@/components/ProductRow";
import { prisma } from "@/lib/prisma";
import { Metadata } from "next";
import { redirect } from "next/navigation";

type SearchParamsType = {
  page: string;
  startCost: string;
  finalCost: string;
  category: string;
};

export const metadata: Metadata = {
  title: "GAMES2023 | Каталог",
};

export default async function CatalogPage({
  searchParams,
}: {
  searchParams: SearchParamsType;
}) {
  if (!searchParams.page)
    redirect("/catalog?page=1");

  const productsCount = await prisma.product.count();

  const products = await prisma.product.findMany({
    take: 10,
    skip: (Number(searchParams.page) - 1) * 10,
    where: {
      AND: [
        // { 
        //   categoryId: {

        //   }  
        // },
        {
          AND: [
            {
              price: {
                gt: Number(searchParams.startCost) || 0,
              },
            },
          ],
        },
      ],
    },
  });

  return (
    <>
      <div className="md:flex md:flex-row-reverse md:items-start mb-3">
        <div className="flex justify-between items-center mt-3 px-3">
          <h2 className="text-2xl font-bold md:hidden">Каталог</h2>
          <FilterSelects />
        </div>

        <div className="flex flex-col gap-3 px-3 mt-3 md:w-full">
          {products.map((product) => (
            <ProductRow product={product} key={product.id} />
          ))}

          <PaginationNav productsCount={productsCount} />
        </div>
      </div>
    </>
  );
}
