import Slider from "@/components/Slider";
import { BannerItem } from "@/components/BannerItem";
import { prisma } from "@/lib/prisma";
import { ProductRow } from "@/components/ProductRow";
import { CategorySection } from "@/components/CategorySection";

export default async function MainPage() {
  const bannerProducts = await prisma.product.findMany({
    take: 3,
    select: {
      categoryId: true,
      description: true,
      id: true,
      images: true,
      name: true,
      price: true,
    },
  });

  const hotProducts = await prisma.product.findMany({
    take: 4,
    skip: 3,
    select: {
      categoryId: true,
      description: true,
      id: true,
      images: true,
      name: true,
      price: true,
    },
  });

  const categories = await prisma.category.findMany({
    select: {
      name: true,
      id: true,
      products: {
        take: 5,
        select: {
          categoryId: true,
          description: true,
          id: true,
          images: true,
          name: true,
          price: true,
        },
      },
    },
  });

  return (
    <>
      <section className="md:flex md:justify-center md:items-center md:min-h-[calc(100vh-98px)] mb-3">
        <div className="md:container">
          <Slider>
            {bannerProducts.map((product) => (
              <BannerItem product={product} key={product.id} />
            ))}
          </Slider>

          <div className="flex flex-col gap-3 mt-3">
            <h2 className="uppercase w-full text-2xl font-bold text-center my-3">
              Хиты
            </h2>
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
          videoLink={`/videos/${category.name}.mp4`}
        >
          {category.products.map((product) => (
            <ProductRow product={product} key={product.id} />
          ))}
        </CategorySection>
      ))}
    </>
  );
}
