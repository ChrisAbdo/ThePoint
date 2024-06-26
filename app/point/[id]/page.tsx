import ViewOnly from "@/components/editor/view-only";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { prisma } from "@/prisma/db";
import { JSONContent } from "novel";

export default async function Point({ params }: { params: { id: string } }) {
  const point = await prisma.point.findUnique({
    where: {
      id: params.id,
    },
    include: {
      author: true,
    },
  });
  return (
    <div>
      <div className="bg-white py-6">
        <div className="mt-6 flex items-center whitespace-nowrap gap-2 text-muted-foreground font-light text-sm">
          <p>Shared by</p>
          <div className="flex gap-1 items-center">
            <Avatar className="size-5">
              {/* @ts-ignore */}
              <AvatarImage src={point?.author.image}></AvatarImage>
              <AvatarFallback></AvatarFallback>
            </Avatar>
            <p>{point?.author.name}</p>
          </div>
        </div>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          {point?.title}
        </h1>

        <div className="mt-6" />
        <ViewOnly initialValue={point?.content as JSONContent} />
      </div>
    </div>
  );
}
