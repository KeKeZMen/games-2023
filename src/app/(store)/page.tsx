import Slider from "@/components/Slider";
import { BannerItem } from "@/components/BannerItem";
import { prisma } from "@/lib/prisma";
import { ProductRow } from "@/components/ProductRow";
import { CategorySection } from "@/components/CategorySection";

export default async function MainPage() {
  const bannerProducts = await prisma.product.findMany({
    take: 3,
  });

  const hotProducts = await prisma.product.findMany({
    take: 4,
    skip: 3,
  });

  const categories = await prisma.category.findMany({
    where: {
      name: {
        in: ["Шутер", "Стратегия", "RPG"],
      },
    },
    select: {
      name: true,
      id: true,
      products: {
        take: 10,
      },
    },
  });

  return (
    <>
      <section className="md:flex md:justify-center md:items-center md:h-[calc(100vh-98px)]">
        <div className="md:container">
          <Slider>
            {bannerProducts.map((product) => (
              <BannerItem product={product} key={product.id} />
            ))}
          </Slider>

          <div className="flex flex-col gap-3 mt-3">
            <h2 className="text-center text-2xl">Хиты</h2>
            {hotProducts.map((product) => (
              <ProductRow product={product} key={product.id} />
            ))}
          </div>
        </div>
      </section>

      {categories.map((category, i) => (
        <CategorySection
          key={i}
          title={category.name}
          videoLink={`/${category.name}.mp4`}
        >
          {category.products.map((product) => (
            <ProductRow product={product} key={product.id} />
          ))}
        </CategorySection>
      ))}
    </>
  );
}
