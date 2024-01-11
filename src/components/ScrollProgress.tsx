"use client";

import { useWindowSize } from "@/lib/hooks/useWindowSize";
import { Progress } from "@/lib/ui/progress";
import { useCallback, useEffect, useState } from "react";

export const ScrollProgress = () => {
  const [progress, setProgress] = useState(30);
  const { width } = useWindowSize();

  const handleScroll = useCallback(() => {
    const winScroll = document.documentElement.scrollTop;
    const height =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;

    const scrolled = (winScroll / height) * 100;

    setProgress(scrolled);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  if (!width || width <= 768) return null;

  return (
    <Progress className="absolute w-full rounded-none top-0 h-[5px] z-50" value={progress} />
  );
};
