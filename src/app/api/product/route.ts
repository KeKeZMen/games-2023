import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
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
