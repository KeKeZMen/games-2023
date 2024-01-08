"use client";

import { useWindowSize } from "@/lib/hooks/useWindowSize";
import Link from "next/link";
import { FC } from "react";

type PropsType = {
  links: Array<{ link: string; title: string }>;
};

export const Nav: FC<PropsType> = ({ links }) => {
  const { width } = useWindowSize();

  if (width && width <= 768) return null;

  return (
    <nav className="flex justify-between items-center gap-3">
      {links.map((link, i) => (
        <Link href={link.link} key={i}>
          {link.title}
        </Link>
      ))}
    </nav>
  );
};
