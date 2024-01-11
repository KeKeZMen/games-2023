import Link from "next/link";
import { FC } from "react";
import { IProductWithImages } from "@/lib/Interfaces";

type PropsType = {
  product: IProductWithImages;
};

export const BannerItem: FC<PropsType> = ({ product }) => {
  return (
    <Link
      className="flex gap-1 bg-[hsl(var(--primary-foreground))]"
      href={`/product/${product.id}`}
    >
      <img
        src={product.images.find((i) => i.isPreview)?.link}
        alt=""
        className="w-full relative md:w-[70%]"
      />

      <div className="hidden w-[30%] md:flex flex-col p-5 justify-between">
        <h2 className="text-2xl">{product.name}</h2>

        <div className="hidden md:grid grid-cols-2 grid-rows-3 gap-1">
          {product.images
            .filter((img) => !img.isPreview)
            .map((img) => (
              <img src={img.link} key={img.id} />
            ))}
        </div>

        <p className="justify-self-end">{product.price}$</p>
      </div>

      <div className="absolute bottom-0 bg-black/35 w-full p-1 flex justify-between md:hidden">
        <p>{product.name}</p>
        <p>{product.price}$</p>
      </div>
    </Link>
  );
};
