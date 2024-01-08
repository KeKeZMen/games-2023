"use client";

import { Category } from "@prisma/client";
import { useWindowSize } from "@/lib/hooks/useWindowSize";
import { Button } from "@/lib/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/lib/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/lib/ui/select";
import { useState } from "react";
import useSWR, { Fetcher } from "swr";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/lib/ui/input";

const categoriesFetcher: Fetcher<Array<Category>, string> = (url) =>
  fetch(url).then((res) => res.json());

const Selects = () => {
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();

  const { data: categories, isLoading: isLoadingCategories } = useSWR(
    "/api/category",
    categoriesFetcher
  );

  const [selectedCategory, setSelectedCategory] = useState("");
  const [startCost, setStartCost] = useState("0");
  const [finalCost, setFinalCost] = useState("1000");

  const handleQuery = () => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));

    current.set("category", selectedCategory);
    current.set("startCost", startCost);
    current.set("finalCost", finalCost);

    let search = current.toString();
    const query = search ? `?${search}` : "";

    router.push(`${pathName}${query}`);
    router.refresh();
  };

  const handleResetQuery = () => {
    router.push(`${pathName}`);
    router.refresh();
  };

  return (
    <>
      {!isLoadingCategories && (
        <Select onValueChange={(val) => setSelectedCategory(val)}>
          <SelectTrigger>
            <SelectValue placeholder="Категория" />
          </SelectTrigger>
          <SelectContent>
            {categories?.map((category) => (
              <SelectItem
                value={String(category.id)}
                className="cursor-pointer"
                key={category.id}
              >
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}

      <Input
        onChange={(e) => setStartCost(e.target.value)}
        value={startCost}
        type="number"
      />

      <Input
        onChange={(e) => setFinalCost(e.target.value)}
        value={finalCost}
        type="number"
      />

      <Button variant="default" onClick={handleQuery}>
        Применить фильтры
      </Button>

      <Button variant="destructive" onClick={handleResetQuery}>
        Сбросить фильтры
      </Button>
    </>
  );
};

export const FilterSelects = () => {
  const [isOpenedModal, setIsOpenedModal] = useState(false);
  const { width } = useWindowSize();

  const handleModal = () => {
    setIsOpenedModal((prev) => !prev);
  };

  if (!width) return <></>;

  if (width <= 768) {
    return (
      <>
        <Button variant="secondary" onClick={handleModal}>
          Фильтр
        </Button>

        <Dialog open={isOpenedModal} onOpenChange={handleModal}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Фильтр</DialogTitle>
            </DialogHeader>
            <Selects />
          </DialogContent>
        </Dialog>
      </>
    );
  } else {
    return (
      <div className="flex flex-col justify-between items-center gap-3">
        <h3>Фильтры</h3>
        <Selects />
      </div>
    );
  }
};
