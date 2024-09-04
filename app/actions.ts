"use server";
//
import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";

import { prisma } from "@/prisma/db";
import { authOptions } from "@/lib/auth/auth-options";
import { redirect } from "next/navigation";

let sessionCache: any = null;

async function getSession() {
  if (!sessionCache) {
    sessionCache = await getServerSession(authOptions);
  }
  return sessionCache;
}
export async function createPoint(formData: FormData) {
  const session = await getSession();
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  const category = formData.get("category") as string;

  console.log("Received data:", { title, content, category }); // Debug log
  const authorId = session?.user.id;

  if (!title || !content || !category) {
    console.error("Missing required fields");
    return { error: "Missing required fields" };
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
    return { error: "Failed to create point", details: error.message };
  }
}

export async function createCategory(name: string) {
  const session = await getSession();
  const authorId = session?.user.id;

  if (!name || !authorId) {
    console.error("Missing required fields");
    return { error: "Missing required fields" };
  }

  try {
    const category = await prisma.category.create({
      data: {
        name,
        users: {
          connect: { id: authorId },
        },
      },
    });

    console.log("Category created:", category);
    revalidatePath("/profile");
    return { success: true, category };
  } catch (error) {
    console.error("Error creating category:", error);
    return { error: "Failed to create category", details: error.message };
  }
}

export async function getCategories() {
  const session = await getSession();
  const userId = session?.user.id;

  if (!userId) {
    return { error: "User not authenticated" };
  }

  try {
    const categories = await prisma.category.findMany({
      where: {
        users: {
          some: {
            id: userId,
          },
        },
      },
      orderBy: {
        name: "asc",
      },
    });

    return { success: true, categories };
  } catch (error) {
    console.error("Error fetching categories:", error);
    return { error: "Failed to fetch categories", details: error.message };
  }
}
