import ViewOnly from "@/components/editor/view-only";
import { SharePoint } from "@/components/post/share-point";
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
      <div className="bg-background py-6">
        <div className="flex w-full justify-between items-center">
          <div className="flex items-center whitespace-nowrap gap-2 text-muted-foreground font-light text-sm">
            <p>Shared by</p>
            <div className="flex gap-1 items-center">
              <Avatar className="size-5">
                <AvatarImage src={point?.author.image}></AvatarImage>
                <AvatarFallback></AvatarFallback>
              </Avatar>
              <p>{point?.author.name}</p>
            </div>
          </div>

          {/* <a href={`/points/${point?.id}/edit`} className="text-primary">
            Edit
          </a> */}
          <SharePoint point={point} />
        </div>

        <h1 className="mt-6 text-3xl font-bold tracking-tight text-primary sm:text-4xl">
          {point?.title}
        </h1>

        <div className="mt-2" />
        <ViewOnly initialValue={point?.content as JSONContent} />
      </div>
    </div>
  );
}
