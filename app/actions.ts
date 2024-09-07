"use server";

import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";
import { Session } from "next-auth";

import { prisma } from "@/prisma/db";
import { authOptions } from "./api/auth/[...nextauth]/options";

export async function createPoint(formData: FormData) {
  const session = (await getServerSession(authOptions)) as Session | null;
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  const category = formData.get("category") as string;

  console.log("Received data:", { title, content, category }); // Debug log
  const authorId = session?.user?.id;

  if (!title || !content || !category || !authorId) {
    console.error("Missing required fields or user not authenticated");
    return { error: "Missing required fields or user not authenticated" };
  }

  try {
    const point = await prisma.point.create({
      data: {
        title,
        content,
        category,
        authorId,
      },
    });

    console.log("Point created:", point); // Debug log
    revalidatePath("/profile");
    return { success: true, point };
  } catch (error) {
    console.error("Error creating point:", error);
    return {
      error: "Failed to create point",
      details: error instanceof Error ? error.message : String(error),
    };
  }
}

export async function createCategory(formData: FormData) {
  const session = (await getServerSession(authOptions)) as Session | null;
  const name = formData.get("name") as string;

  console.log("Received data:", { name }); // Debug log

  if (!name) {
    console.error("Missing required fields");
    return { error: "Missing required fields" };
  }

  if (!session?.user?.id) {
    console.error("User not authenticated");
    return { error: "User not authenticated" };
  }

  try {
    const category = await prisma.category.create({
      data: {
        name,
      },
    });

    console.log("Category created:", category);
    revalidatePath("/view-mode");

    return { success: true, category };
  } catch (error) {
    console.error("Error creating category:", error);
    return {
      error: "Failed to create category",
      details: error instanceof Error ? error.message : String(error),
    };
  }
}
