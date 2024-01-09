import { CreateCategoryButton } from "@/components/CreateCategory";
import { CreateProductButton } from "@/components/CreateProduct";
import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";

export default async function AdminPage() {
  const session = await getServerSession(authOptions)
  if (session?.user?.id !== "clpl6gb7e000008l45rq9dsxy") return redirect("/");

  return (
    <div className="flex justify-around items-center w-full">
      <CreateCategoryButton />
      <CreateProductButton />
    </div>
  );
}
