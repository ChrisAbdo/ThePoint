import DisplayPosts from "@/components/profile/display-posts";
import ProfileHeader from "@/components/profile/header";
import { authOptions } from "../api/auth/[...nextauth]/options";
import { prisma } from "@/prisma/db";
import { getServerSession } from "next-auth/next";

export default async function Profile() {
  const session = await getServerSession(authOptions);

  const posts = await prisma.point.findMany({
    where: {
      authorId: session?.user?.id,
    },
    include: {
      author: true,
    },
  });
  return (
    <div>
      <ProfileHeader />
      <DisplayPosts posts={posts} />
    </div>
  );
}
