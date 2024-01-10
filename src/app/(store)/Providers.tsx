"use client";

import { FC, ReactNode } from "react";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";
type PropsType = {
  children: ReactNode;
};

export const Providers: FC<PropsType> = ({ children }) => {
  return (
    <SessionProvider>
      <Toaster />
      {children}
    </SessionProvider>
  );
};
