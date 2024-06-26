import ViewOnly from "@/components/editor/view-only";
import { prisma } from "@/prisma/db";
import { JSONContent } from "novel";

export default async function Dev() {
  const points = await prisma.point.findUnique({
    where: {
      id: "clxvdjql3000duys1iitszaed",
    },
  });
  console.log(points);
  return (
    <div>
      {points ? (
        <ViewOnly initialValue={points.content as JSONContent} />
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
}
