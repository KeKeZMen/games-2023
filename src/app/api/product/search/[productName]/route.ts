import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  req: Request,
  { params }: { params?: { productName?: string } }
) {
  if (!params)
    return NextResponse.json({ message: "Ошибка сервера" }, { status: 500 });

  const products = await prisma.product.findMany({
    where: { name: { contains: params.productName } },
  });

  return NextResponse.json(products);
}
