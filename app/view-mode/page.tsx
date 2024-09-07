import ViewOnly from "@/components/editor/view-only";
import { prisma } from "@/prisma/db";
import React from "react";
import { JSONContent } from "novel";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DotsVerticalIcon } from "@radix-ui/react-icons";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/options";
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
  return (
    <div>
      {points.map((point, index) => {
        const content =
          typeof point.content === "string"
            ? JSON.parse(point.content)
            : point.content;
        return (
          <React.Fragment key={point.id}>
            {/* <h2 className="text-2xl font-bold">{point.title}</h2>
            <time className="text-sm text-gray-500">
              {new Date(point.createdAt).toLocaleDateString()}
            </time> */}
            <div className="bg-white px-4 py-5 sm:px-6">
              <div className="-ml-4 -mt-4 flex flex-wrap items-center justify-between sm:flex-nowrap">
                <div className="ml-4 mt-4">
                  <h3 className="text-base font-semibold leading-6 text-gray-900">
                    {point.title}
                  </h3>
                  {/* <p className="mt-1 text-sm text-gray-500">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit quam
                    corrupti consectetur.
                  </p> */}
                  <time className="text-sm text-gray-500">
                    {new Date(point.createdAt).toLocaleDateString()}
                  </time>
                </div>
                <div className="ml-4 mt-4 flex items-center space-x-2">
                  <Button variant="outline">Edit</Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <DotsVerticalIcon className="size-5" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuLabel>My Account</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>Profile</DropdownMenuItem>
                      <DropdownMenuItem>Billing</DropdownMenuItem>
                      <DropdownMenuItem>Team</DropdownMenuItem>
                      <DropdownMenuItem>Subscription</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </div>
            <ViewOnly initialValue={content as JSONContent} />
            {index < points.length - 1 && <Separator className="my-4" />}
          </React.Fragment>
        );
      })}

      <ToolbarExpandable />
    </div>
  );
}
