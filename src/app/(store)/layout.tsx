import { ReactNode } from "react";
import { Providers } from "./Providers";
import Header from "@/components/Header";

export default async function StoreLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <Providers>
      <Header />
      <main className="pt-[82px] md:pt-[110px] md:container">{children}</main>
    </Providers>
  );
}
