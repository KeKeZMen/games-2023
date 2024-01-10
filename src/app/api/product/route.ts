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
    const files = body
      .getAll("files")
      .filter((f) => typeof f !== "string") as Array<File>;
    const links: Array<string> = [];

    await mkdir(resolve(__dirname, "../../../../public/games", replacedName));

    for (let i = 0; i < files.length; i++) {
      const bytes = await files[i].arrayBuffer();
      const buffer = Buffer.from(bytes);

      const path = join(
        resolve(__dirname, "../../../../public/games/", replacedName),
        `${replacedName}-${i + 1}.${files[i].name.split(".").at(-1)}`
      );

      links.push(
        `/games/${replacedName}/${replacedName}-${i + 1}.${files[i].name
          .split(".")
          .at(-1)}`
      );

      await writeFile(path, buffer);
    }

    await prisma.product.create({
      data: {
        price: parseInt(cost),
        description: desk,
        links: links.join(","),
        name,
        categoryId: parseInt(categoryId),
      },
    });

    return NextResponse.json({ message: "Продукт создан!" });
}
