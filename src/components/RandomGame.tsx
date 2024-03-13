"use client";

import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { FC, useEffect, useState } from "react";

type PropsType = {
  productIds: number[];
};

export const RandomGame: FC<PropsType> = ({ productIds }) => {
  const [isShowingLink, setIsShowingLink] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      setIsShowingLink(true);
    }, 40 * 1000);
  }, []);

  const handleClick = () => {
    router.push(
      `/product/${productIds[Math.floor(Math.random() * productIds.length)]}`
    );
  };

  return (
    <AnimatePresence>
      {isShowingLink && (
        <motion.button
          initial={{ opacity: 0, fontSize: 0 }}
          animate={{ opacity: 1, fontSize: "48px" }}
          exit={{ opacity: 0, fontSize: 0 }}
          onClick={handleClick}
          className="animate-spin-slow text-5xl fixed right-5 bottom-20 md:bottom-5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 inline-block text-transparent bg-clip-text"
        >
          O
        </motion.button>
      )}
    </AnimatePresence>
  );
};
