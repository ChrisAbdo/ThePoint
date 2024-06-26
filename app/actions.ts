"use server";

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

  const title = String(formData.get("title"));
  const content = String(formData.get("content"));
  const contentObject = JSON.parse(content);

  const authorId = session?.user.id;

  try {
    await prisma.point.create({
      data: {
        title,
        content: contentObject, // Store the parsed object, not the string
        authorId,
      },
    });
  } catch (error: any) {
    return {
      error: error.message,
    };
  }
  revalidatePath("/profile");
  redirect("/profile");
}
