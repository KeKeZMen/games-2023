import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { CartedProduct } from "@/components/CartedProduct";
import { RemoveFromCartButton } from "@/components/RemoveFromCartButton";
import { Metadata } from "next";
import { OrderButton } from "@/components/OrderButton";

export const metadata: Metadata = {
  title: "GAMES2023 | Корзина",
};

export default async function CartPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return redirect("/");

  const cartedProducts = await prisma.product.findMany({
    where: {
      OrderItem: {
        some: {
          order: {
            userId: session.user.id,
          },
        },
      },
    },
  });

  return (
    <>
      <h2 className="text-2xl my-3 text-center">Ваша корзина</h2>

      <div className="bg-[hsl(var(--primary-foreground))] mb-3 flex flex-col md:container">
        {cartedProducts.length > 0 ? (
          cartedProducts.map((product) => (
            <CartedProduct
              product={product}
              RemoveFromCart={<RemoveFromCartButton productId={product.id} />}
              key={product.id}
            />
          ))
        ) : (
          <p className="text-center py-3">Ваша корзина пуста!</p>
        )}
      </div>

      {cartedProducts.length > 0 && (
        <div className="bg-[hsl(var(--primary-foreground))] p-3 flex justify-between items-center md:container">
          <p>
            Общая стоимость:{" "}
            {cartedProducts.reduce((acc, cur) => (acc += cur.price), 0)}$
          </p>
          <OrderButton />
        </div>
      )}
    </>
  );
}
