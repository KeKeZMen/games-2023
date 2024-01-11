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
  categoryId: string;
};

type FilterType = {
  AND: Array<{
    [key: string]: {
      [key: string]: string | number;
    };
  }>;
};

export const metadata: Metadata = {
  title: "GAMES2023 | Каталог",
};

export default async function CatalogPage({
  searchParams,
}: {
  searchParams: SearchParamsType;
}) {
  if (Object.values(searchParams).length < 4) {
    redirect("/catalog?page=0&categoryId=all&startCost=0&finalCost=1000");
  }

  const productsCount = await prisma.product.count();

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
    },
    where,
  });

  return (
    <section className="md:container">
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
    </section>
  );
}
