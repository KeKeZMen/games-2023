import { NextResponse } from "next/server";
import { writeFile, mkdir, rm } from "fs/promises";
import { dirname, join, resolve } from "path";
import { fileURLToPath } from "url";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (session?.user?.id !== "clpl6gb7e000008l45rq9dsxy") {
    return NextResponse.json({ message: "Нет доступа!" });
  }

  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);

  const body = await req.formData();

  const discount = body.get("discount") as string;
  const name = body.get("name") as string;
  const replacedName = name.replaceAll(" ", "-").toLowerCase();
  const desk = body.get("description") as string;
  const categoryId = body.get("categoryId") as string;
  const cost = body.get("cost") as string;
  const images = body
    .getAll("image")
    .filter((f) => typeof f !== "string") as Array<File>;
  const preview = body
    .getAll("preview")
    .filter((f) => typeof f !== "string") as Array<File>;

  const dirPath = resolve(__dirname, "../../../../public/games", replacedName);

  await mkdir(dirPath);

  const product = await prisma.product.create({
    data: {
      price: parseInt(cost),
      description: desk,
      name,
      categoryId: parseInt(categoryId),
      discount: Number(discount)
    },
  });

  const previewBytes = await preview[0].arrayBuffer();

  const previewBuffer = Buffer.from(previewBytes);
  const previewPath = join(
    dirPath,
    `${replacedName}-0.${preview[0].name.split(".").at(-1)}`
  );

  await writeFile(previewPath, previewBuffer);

  await prisma.productImage.create({
    data: {
      productId: product.id,
      link: `/games/${replacedName}/${replacedName}-0.${preview[0].name
        .split(".")
        .at(-1)}`,
      isPreview: true,
    },
  });

  for (let i = 0; i < images.length; i++) {
    const imageBytes = await images[i].arrayBuffer();
    const imageBuffer = Buffer.from(imageBytes);

    const imagePath = join(
      dirPath,
      `${replacedName}-${i + 1}.${images[i].name.split(".").at(-1)}`
    );

    await writeFile(imagePath, imageBuffer);

    await prisma.productImage.create({
      data: {
        productId: product.id,
        link: `/games/${replacedName}/${replacedName}-${i + 1}.${images[i].name
          .split(".")
          .at(-1)}`,
      },
    });
  }

  return NextResponse.json({ message: "Продукт создан!" });
}

export async function DELETE(req: Request) {
  const session = await getServerSession(authOptions);

  if (session?.user?.id !== "clpl6gb7e000008l45rq9dsxy") {
    return NextResponse.json({ message: "Нет доступа!" });
  }

  const { productId } = await req.json();

  const product = await prisma.product.findFirst({
    where: {
      id: Number(productId),
    },
  });

  if (!product)
    return NextResponse.json({ message: "Такой игры не существует!" });

  const name = product.name.replaceAll(" ", "-").toLowerCase();

  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);

  const dirPath = resolve(__dirname, "../../../../public/games", name);

  await rm(dirPath, { force: true, recursive: true });

  await prisma.productImage.deleteMany({
    where: {
      productId: Number(productId),
    },
  });
  
  await prisma.orderItem.deleteMany({
    where: {
      productId: Number(productId),
    }
  })

  await prisma.product.delete({
    where: {
      id: Number(productId),
    },
  });

  return NextResponse.json({ message: "Игра удалена!" });
}

export async function PATCH(req: Request) {
  const session = await getServerSession(authOptions);

  if (session?.user?.id !== "clpl6gb7e000008l45rq9dsxy") {
    return NextResponse.json({ message: "Нет доступа!" });
  }

  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);

  const body = await req.formData();

  const id = body.get("id") as string;
  const name = body.get("name") as string;
  const discount = body.get("discount") as string;
  const replacedName = name.replaceAll(" ", "-").toLowerCase();
  const desk = body.get("description") as string;
  const categoryId = body.get("categoryId") as string;
  const cost = body.get("cost") as string;
  const images = body
    .getAll("image")
    .filter((f) => typeof f !== "string") as Array<File>;
  const preview = body
    .getAll("preview")
    .filter((f) => typeof f !== "string") as Array<File>;

  const existedProduct = await prisma.product.findFirst({
    where: {
      id: Number(id),
    },
  });

  if (!existedProduct)
    return NextResponse.json({ message: "Такого продукта не существует!" });

  const dirPath = resolve(__dirname, "../../../../public/games", replacedName);
  const oldDirPath = resolve(
    __dirname,
    "../../../../public/games",
    existedProduct.name.replaceAll(" ", "-").toLowerCase()
  );

  await rm(oldDirPath, { force: true, recursive: true });

  await prisma.productImage.deleteMany({
    where: {
      productId: Number(id),
    },
  });

  await mkdir(dirPath);

  const product = await prisma.product.update({
    where: {
      id: Number(id),
    },
    data: {
      price: parseInt(cost),
      description: desk,
      name,
      categoryId: parseInt(categoryId),
      discount: Number(discount)
    },
  });

  const previewBytes = await preview[0].arrayBuffer();

  const previewBuffer = Buffer.from(previewBytes);
  const previewPath = join(
    dirPath,
    `${replacedName}-0.${preview[0].name.split(".").at(-1)}`
  );

  await writeFile(previewPath, previewBuffer);

  await prisma.productImage.create({
    data: {
      productId: product.id,
      link: `/games/${replacedName}/${replacedName}-0.${preview[0].name
        .split(".")
        .at(-1)}`,
      isPreview: true,
    },
  });

  for (let i = 0; i < images.length; i++) {
    const imageBytes = await images[i].arrayBuffer();
    const imageBuffer = Buffer.from(imageBytes);

    const imagePath = join(
      dirPath,
      `${replacedName}-${i + 1}.${images[i].name.split(".").at(-1)}`
    );

    await writeFile(imagePath, imageBuffer);

    await prisma.productImage.create({
      data: {
        productId: product.id,
        link: `/games/${replacedName}/${replacedName}-${i + 1}.${images[i].name
          .split(".")
          .at(-1)}`,
      },
    });
  }

  return NextResponse.json({ message: "Продукт отредактирован!" });
}
