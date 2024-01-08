import IProduct from "@/lib/typecode/IProduct";
import Link from "next/link";
import { FC } from "react";

type PropsType = {
  product: IProduct;
};

export const BannerItem: FC<PropsType> = ({ product }) => {
  return (
    <Link
      className="flex gap-1 bg-[hsl(var(--primary-foreground))]"
      href={`/product/${product.id}`}
    >
      <img
        src={product.links.split(",")[0]}
        className="w-full relative md:w-[70%]"
      />

      <div className="hidden w-[30%] md:flex flex-col p-5 justify-between">
        <h2 className="text-2xl">{product.name}</h2>

        <div className="hidden md:grid grid-cols-2 grid-rows-3 gap-1">
          {product.links.split(",").map((link, i) => (
            <img src={link} alt="" key={i}/>
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
