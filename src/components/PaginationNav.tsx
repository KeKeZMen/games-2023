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

  const handleParams = (page: number) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));
    current.set("page", String(page))
    let search = current.toString();
    const query = search ? `?${search}` : "";

    router.push(`${pathname}${query}`);
    router.refresh();
  };

  return (
    <Pagination>
      <PaginationContent>
        <PaginationPrevious
          onClick={() => handleParams(Number(page) > 1 ? Number(page) - 1 : 0)}
        />

        {Array.from({ length: Math.ceil(productsCount / 10) }).map((_, i) => (
          <PaginationLink
            key={i}
            isActive={i == Number(page)}
            onClick={() => handleParams(i)}
          >
            {i}
          </PaginationLink>
        ))}

        <PaginationNext
          onClick={() =>
            handleParams(
              Number(page) < Math.ceil(productsCount / 10)
                ? Number(page) + 1
                : Math.ceil(productsCount / 10)
            )
          }
        />
      </PaginationContent>
    </Pagination>
  );
};
