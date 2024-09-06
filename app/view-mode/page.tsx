import ViewOnly from "@/components/editor/view-only";
import { prisma } from "@/prisma/db";
import React from "react";
import { JSONContent } from "novel";
import { Separator } from "@/components/ui/separator";

export default async function Home() {
  const points = await prisma.point.findMany();
  return (
    <div>
      {points.map((point, index) => {
        const content =
          typeof point.content === "string"
            ? JSON.parse(point.content)
            : point.content;
        return (
          <React.Fragment key={point.id}>
            <ViewOnly initialValue={content as JSONContent} />
            {index < points.length - 1 && <Separator className="m-4" />}
          </React.Fragment>
        );
      })}
    </div>
  );
}
