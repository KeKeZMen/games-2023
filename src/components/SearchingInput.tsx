"use client";

import type { Product } from "@prisma/client";
import { SearchedProducts } from "@/components/SearchedProduct";
import { useDebounce } from "@/lib/hooks/useDebounce";
import { RxCross1 } from "react-icons/rx";
import { ChangeEvent, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FaMagnifyingGlass } from "react-icons/fa6";

const getSearchedProducts = async (searchTerm?: string) => {
  if (searchTerm) {
    try {
      const res = await fetch(`/api/product/search/${searchTerm}`);
      return res.json() as Promise<Array<Product>>;
    } catch (e) {
      return [] as Array<Product>;
    }
  } else {
    return [] as Array<Product>;
  }
};

export const SearchProductInput = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const [searchedProducts, setSearchedProducts] = useState<Array<Product>>([]);
  const [isOpenedDialog, setIsOpenedDialog] = useState(false);
  const [isOpenedInput, setIsOpenedInput] = useState(false);

  useEffect(() => {
    if (debouncedSearchTerm !== "") {
      setIsOpenedDialog(true);
      getSearchedProducts(searchTerm).then((data) => setSearchedProducts(data));
    } else {
      setIsOpenedDialog(false);
    }
  }, [debouncedSearchTerm]);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleInput = () => {
    setIsOpenedInput((prev) => !prev);
  };

  const handleClean = () => {
    setSearchTerm("");
    setIsOpenedDialog(false);
    handleInput();
  };

  return (
    <>
      <AnimatePresence>
        {isOpenedInput && (
          <motion.div
            className="absolute flex justify-center items-center right-0"
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            exit={{ width: 0 }}
          >
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearch}
              placeholder="Поиск"
              className="outline-none bg-[#f4f4f4] rounded-md text-xl text-black p-[2px] w-full"
            />
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute right-0 w-5 h-5 bg-no-repeat text-black"
              onClick={handleClean}
            >
              <RxCross1 />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {isOpenedDialog && searchedProducts && (
        <div className="absolute bg-[hsl(var(--primary-foreground))] rounded-md px-5 left-0 md:left-auto top-10 md:top-12 w-[200px] md:w-[300px] z-10 shadow-md max-h-[200px] overflow-y-auto">
          {searchedProducts.length < 1 ? (
            <p className="p-3 text-white w-full text-center text-xl">
              Нет совпадений
            </p>
          ) : (
            searchedProducts.map((product, index) => (
              <SearchedProducts
                searchedProduct={product}
                key={index}
                onClick={handleClean}
              />
            ))
          )}
        </div>
      )}

      <button className="text-2xl" onClick={handleInput}>
        <FaMagnifyingGlass />
      </button>
    </>
  );
};
