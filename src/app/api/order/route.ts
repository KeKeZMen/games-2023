import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({
        message: "Сначала вы должны войти в свой аккаунт!",
      });
    }

    const body = await req.json();

    let order = await prisma.order.findFirst({
      where: {
        userId: session.user.id,
      },
    });

    if (!order) {
      order = await prisma.order.create({
        data: {
          userId: session.user.id,
        },
      });
    }

    await prisma.orderItem.create({
      data: {
        orderId: order.id,
        productId: body.id,
      },
    });

    return NextResponse.json({ message: "Продукт добавлен в корзину!" });
  } catch (error) {
    return NextResponse.json({ message: error });
  }
}

export async function DELETE(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({
        message: "Сначала вы должны войти в свой аккаунт!",
      });
    }

    const body = await req.json();

    const order = await prisma.order.findFirst({
      where: {
        userId: session.user.id,
      },
    });

    if (!order) {
      return NextResponse.json({ message: "У вас пустая корзина!" });
    }

    const orderItem = await prisma.orderItem.findFirst({
      where: {
        orderId: order.id,
        productId: body.id,
      },
    });

    if (!orderItem) {
      return NextResponse.json({ message: "Такой игры в корзине нет!" });
    }

    await prisma.orderItem.delete({
      where: {
        id: orderItem.id,
      },
    });

    return NextResponse.json({ message: "Игра удалена из корзины!" });
  } catch (error) {
    return NextResponse.json({ message: error });
  }
}
