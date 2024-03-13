import { ReactNode } from "react";
import { Providers } from "./Providers";
import Header from "@/components/Header";
import { prisma } from "@/lib/prisma";
import { RandomGame } from "@/components/RandomGame";

export default async function StoreLayout({
  children,
}: {
  children: ReactNode;
}) {
  const productsIds = await prisma.product.findMany({
    select: {
      id: true,
    },
  });

  return (
    <Providers>
      <Header />
      <main className="pt-[82px] md:pt-[120px]">{children}</main>
      <RandomGame productIds={productsIds.map((p) => p.id)} />
    </Providers>
  );
}
