import { authOptions } from "@/lib/authOptions";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (session?.user?.id !== "clpl6gb7e000008l45rq9dsxy") {
      return NextResponse.json({ message: "Нет доступа!" });
    }

    const body = await req.json();

    await prisma.category.create({
      data: {
        ...body,
      },
    });

    return NextResponse.json({ message: "Категория создана!" });
  } catch (error) {
    return NextResponse.json({ message: error });
  }
}

export async function GET() {
  const categories = await prisma.category.findMany();

  return NextResponse.json(categories);
}
