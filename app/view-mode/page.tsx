import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/options";
import { CategoryPanel } from "@/components/view-mode/category-panel";
import { prisma } from "@/prisma/db";
import ToolbarExpandable from "@/components/view-mode/toolbar";

export default async function Home() {
  const session = await getServerSession(authOptions);
  const points = await prisma.point.findMany({
    where: {
      authorId: session?.user?.id,
    },
    include: {
      author: true,
    },
  });
  const categories = points.map((point) => point.category);
  return (
    <div>
      <CategoryPanel points={points} categories={categories} />
      <ToolbarExpandable />
    </div>
  );
}
