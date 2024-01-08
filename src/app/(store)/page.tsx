import Slider from "@/components/Slider";
import { BannerItem } from "@/components/BannerItem";
import { prisma } from "@/lib/prisma";

export default async function MainPage() {
  const products = await prisma.product.findMany({
    take: 3,
  });

  return (
    <Slider>
      {products.map((product) => (
        <BannerItem product={product} key={product.id} />
      ))}
    </Slider>
  );
}
