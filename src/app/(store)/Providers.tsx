"use client";

import { FC, ReactNode } from "react";
import { SessionProvider } from "next-auth/react";

type PropsType = {
  children: ReactNode;
};

export const Providers: FC<PropsType> = ({ children }) => {
  return <SessionProvider>{children}</SessionProvider>;
};
