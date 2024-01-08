"use client";

import { FC } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/lib/ui/pagination";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

type PropsType = {
  productsCount: number;
};

export const PaginationNav: FC<PropsType> = ({ productsCount }) => {
  const searchParams = useSearchParams();
  const page = searchParams.get("page");
  const pathname = usePathname();
  const router = useRouter();

  const handleParams = () => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));
    let search = current.toString();
    const query = search ? `${search}` : "";

    router.push(`${pathname}${query}`);
    router.refresh();
  };

  return (
    <Pagination>
      <PaginationContent>
        <PaginationPrevious
          href={`/catalog?page=${Number(page) > 1 ? `${Number(page) - 1}` : 1}`}
          onClick={handleParams}
        />

        {Array.from({ length: Math.ceil(productsCount / 10) }).map((_, i) => (
          <PaginationLink
            href={`/catalog?page=${i + 1}`}
            key={i}
            isActive={i + 1 == Number(page)}
            onClick={handleParams}
          >
            {i + 1}
          </PaginationLink>
        ))}

        <PaginationNext
          href={`/catalog?page=${
            Number(page) < Math.ceil(productsCount / 10)
              ? `${Number(page) + 1}`
              : Math.ceil(productsCount / 10)
          }`}
          onClick={handleParams}
        />
      </PaginationContent>
    </Pagination>
  );
};
