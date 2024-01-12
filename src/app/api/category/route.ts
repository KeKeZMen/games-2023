import { authOptions } from "@/lib/authOptions";
import { prisma } from "@/lib/prisma";
import { writeFile } from "fs/promises";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (session?.user?.id !== "clpl6gb7e000008l45rq9dsxy") {
    return NextResponse.json({ message: "Нет доступа!" });
  }

  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);

  const body = await req.formData();

  const name = body.get("name") as string;
  const video = body
    .getAll("video")
    .filter((f) => typeof f !== "string") as Array<File>;

  const videoBytes = await video[0].arrayBuffer();
  const videoBuffer = Buffer.from(videoBytes);
  const videoName = `${name.toLowerCase()}.${video[0].name.split(".").at(-1)}`;

  await writeFile(
    resolve(__dirname, "../../../../public/videos", videoName),
    videoBuffer
  );

  await prisma.category.create({
    data: {
      name,
    },
  });

  return NextResponse.json({ message: "Категория создана!" });
}

export async function GET() {
  const categories = await prisma.category.findMany();

  return NextResponse.json(categories);
}
