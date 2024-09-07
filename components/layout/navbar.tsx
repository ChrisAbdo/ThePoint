import {
  Book,
  BookOpenText,
  CircleDotDashed,
  Code2,
  Plus,
  Settings2,
} from "lucide-react";
import * as React from "react";
import { Button } from "@/components/ui/button";

import ProfileDropdown from "@/components/auth/profile-dropdown";

import { prisma } from "@/prisma/db";
import NavLinks from "./nav-links";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";

export async function Navbar() {
  // const history = await prisma.point.findMany({
  //   orderBy: {
  //     createdAt: "desc",
  //   },
  // });
  const session = await getServerSession(authOptions);
  const history = await prisma.point.findMany({
    where: {
      authorId: session?.user?.id,
    },
    include: {
      author: true,
    },
  });
  return (
    <div className=" w-full">
      <aside className="fixed bg-gray-50 dark:bg-neutral-900 inset-y-0 left-0 z-20 flex h-full w-[53px] flex-col border-r">
        <div className="border-b p-2">
          <Button variant="ghost" size="icon" aria-label="Home">
            <CircleDotDashed className="size-5 fill-foreground" />
          </Button>
        </div>
        <NavLinks history={history} />
        <nav className="mt-auto grid gap-1 p-2">
          <ProfileDropdown />
        </nav>
      </aside>
    </div>
  );
}
