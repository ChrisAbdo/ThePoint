import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/options";
import { CategoryPanel } from "@/components/view-mode/category-panel";
import { prisma } from "@/prisma/db";
import ToolbarExpandable from "@/components/view-mode/toolbar";

export const experimental_ppr = true;

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return <div>Please log in to view your points.</div>;
  }

  const points = await prisma.point.findMany({
    where: {
      authorId: session.user.id,
    },
    select: {
      id: true,
      title: true,
      content: true,
      category: true,
      createdAt: true,
    },
  });

  const safePoints = points.map((point) => ({
    ...point,
    content:
      typeof point.content === "string"
        ? point.content
        : JSON.stringify(point.content),
  }));

  const categories = Array.from(
    new Set(safePoints.map((point) => point.category))
  );

  console.log(categories);

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <CategoryPanel points={safePoints} categories={categories} />
      <ToolbarExpandable />
    </div>
  );
}
