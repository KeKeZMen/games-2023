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
import { FC, useState } from "react";
import useSWR, { Fetcher } from "swr";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/lib/ui/input";

const categoriesFetcher: Fetcher<Array<Category>, string> = (url) =>
  fetch(url).then((res) => res.json());

type SelectsPropsType = {
  onSelect?: () => void;
};

type SortActionType = {
  value: string;
  key: "name" | "price";
  orderBy: "asc" | "desc";
  label: string;
};

const sortOptions: Array<SortActionType> = [
  {
    value: "0",
    key: "name",
    orderBy: "asc",
    label: "Названия по возрастанию",
  },
  {
    value: "1",
    key: "name",
    orderBy: "desc",
    label: "Названия по убыванию",
  },
  {
    value: "2",
    key: "price",
    orderBy: "asc",
    label: "Цена по возрастанию",
  },
  {
    value: "3",
    key: "price",
    orderBy: "desc",
    label: "Цена по убыванию",
  },
];

const Selects: FC<SelectsPropsType> = ({ onSelect }) => {
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
  const [selectedOrderBy, setSelectedOrderBy] = useState("0");

  const handleQuery = () => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));

    if (selectedCategory == "") {
      current.set("categoryId", "all");
    } else {
      current.set("categoryId", selectedCategory);
    }

    current.set("startCost", startCost);
    current.set("finalCost", finalCost);
    current.set("key", sortOptions[parseInt(selectedOrderBy)].key);
    current.set("orderBy", sortOptions[parseInt(selectedOrderBy)].orderBy);

    let search = current.toString();
    const query = search ? `?${search}` : "";

    onSelect?.();
    router.push(`${pathName}${query}`);
    router.refresh();
  };

  const handleResetQuery = () => {
    onSelect?.();
    router.push(`${pathName}`);
    router.refresh();
  };

  return (
    <>
      {!isLoadingCategories && (
        <Select
          onValueChange={(val) => setSelectedCategory(val)}
          defaultValue="all"
        >
          <SelectTrigger>
            <SelectValue placeholder="Категория" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all" className="cursor-pointer">
              Все категории
            </SelectItem>
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

      <Select onValueChange={(val) => setSelectedOrderBy(val)} defaultValue="0">
        <SelectTrigger>
          <SelectValue placeholder="Категория" />
        </SelectTrigger>
        <SelectContent>
          {sortOptions.map((option, i) => (
            <SelectItem
              value={option.value}
              className=" text-leftcursor-pointer"
              key={i}
            >
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

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

type PropsType = {
  alwaysMobile?: boolean;
};

export const FilterSelects: FC<PropsType> = ({ alwaysMobile }) => {
  const [isOpenedModal, setIsOpenedModal] = useState(false);
  const { width } = useWindowSize();

  const handleModal = () => {
    setIsOpenedModal((prev) => !prev);
  };

  if (!width) return <></>;

  if (width <= 768 || alwaysMobile) {
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
            <Selects onSelect={handleModal} />
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
