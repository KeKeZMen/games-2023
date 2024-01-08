"use client";

import { GiHamburgerMenu } from "react-icons/gi";
import { FC, useState } from "react";
import { useWindowSize } from "@/lib/hooks/useWindowSize";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";

type PropsType = {
  links: Array<{ link: string; title: string }>;
};

export const MenuButton: FC<PropsType> = ({ links }) => {
  const [isOpenedMenu, setisOpenedMenu] = useState(false);
  const { width } = useWindowSize();

  if (width && width >= 768) return null;

  const handleMenu = () => {
    setisOpenedMenu((prev) => !prev);
  };

  return (
    <>
      <button
        className="bg-none border-none text-2xl text-[hsl(var(--primary))] flex justify-center items-center"
        onClick={handleMenu}
      >
        <GiHamburgerMenu />
      </button>

      <AnimatePresence>
        {isOpenedMenu && (
          <motion.div
            className="w-full h-full fixed z-20 top-0 left-0"
            onClick={handleMenu}
            animate={{ backgroundColor: "rgba(0, 0, 0, 0.70)" }}
            exit={{ opacity: 0 }}
          >
            <motion.aside
              initial={{ width: 0 }}
              animate={{ width: "200px" }}
              exit={{ width: 0 }}
              className="w-[200px] flex flex-col bg-[hsl(var(--primary-foreground))] h-full overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between flex-col">
                {links.map((link, i) => (
                  <Link
                    href={link.link}
                    key={i}
                    className="w-full border-b-2 p-4"
                    onClick={handleMenu}
                  >
                    {link.title}
                  </Link>
                ))}
              </div>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
