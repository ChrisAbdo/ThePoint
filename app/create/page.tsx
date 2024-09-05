import Root from "@/components/create/root";
import { prisma } from "@/prisma/db";
import React from "react";

export default async function Home() {
  const categories = await prisma.category.findMany();
  return <Root categories={categories} />;
}
