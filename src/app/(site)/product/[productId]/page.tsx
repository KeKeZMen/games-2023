import { AddToCart } from "@/components/AddToCart";
import { RemoveFromCartButton } from "@/components/RemoveFromCartButton";
import Slider from "@/components/Slider";
import { authOptions } from "@/lib/authOptions";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function ProductPage({
  params,
}: {
  params: { productId: string };
}) {
  const product = await prisma.product.findFirst({
    where: {
      id: Number(params.productId),
    },
    select: {
      categoryId: true,
      description: true,
      id: true,
      images: true,
      name: true,
      price: true,
    },
  });

  if (!product) return redirect("/");

  const category = await prisma.category.findFirst({
    where: {
      id: product.categoryId,
    },
  });

  if (!category) return redirect("/");

  const session = await getServerSession(authOptions);

  const order = await prisma.order.findFirst({
    where: {
      userId: session?.user?.id,
    },
  });

  const isOrdered = await prisma.orderItem.findFirst({
    where: {
      orderId: order?.id,
      productId: Number(params.productId),
    },
  });

  return (
    <>
      <h2 className="text-2xl my-3 font-bold hidden md:block text-center">
        {product.name}
      </h2>

      <div className="w-full md:flex md:gap-4 pb-[100px] md:container">
        <div className="md:w-[70%]">
          <Slider>
            {product.images
              .filter((i) => !i.isPreview)
              .map((image, i) => (
                <img src={image.link} key={i} />
              ))}
          </Slider>
        </div>

        <div className="md:w-[30%]">
          <img
            src={product.images.find((i) => i.isPreview)?.link}
            alt=""
            className="hidden md:block mb-3"
          />

          <h2 className="text-2xl mb-3 font-bold md:hidden">{product.name}</h2>

          <p>{product.description}</p>

          <p className="mt-3">Жанр: {category.name}</p>
        </div>
      </div>

      <div className="fixed bottom-0 w-full flex justify-center p-3 bg-[hsl(var(--primary-foreground))] md:relative md:mt-3 md:container">
        <div className="flex justify-between gap-2 items-center w-full">
          <p>
            Купить <br />
            {product.name}
          </p>

          <div className="flex justify-between rounded-md bg-black">
            <p className="border-r-2 p-1">{product.price}$</p>

            {isOrdered ? (
              <div className="bg-red-500 flex items-center justify-center px-2 rounded-r-md">
                <RemoveFromCartButton productId={product.id} />
              </div>
            ) : (
              <div className="bg-[#00802b] flex items-center justify-center px-2 rounded-r-md">
                <AddToCart productId={product.id} />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
