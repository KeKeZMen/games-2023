import type { Product, ProductImage } from "@prisma/client";

export interface IProductWithImages extends Product {
  images: Array<ProductImage>;
}
