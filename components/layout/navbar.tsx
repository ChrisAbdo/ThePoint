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
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import ProfileDropdown from "@/components/auth/profile-dropdown";
import Link from "next/link";
import { HistoryButton } from "./history-button";
import { prisma } from "@/prisma/db";

export async function Navbar() {
  const history = await prisma.point.findMany({
    orderBy: {
      createdAt: "desc",
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
        <nav className="grid gap-1 p-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Link href="/create">
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-lg"
                  aria-label="New point"
                >
                  <Plus className="size-5" />
                </Button>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right" sideOffset={5}>
              New Point
            </TooltipContent>
          </Tooltip>

          <HistoryButton history={history} />

          <Tooltip>
            <TooltipTrigger asChild>
              <Link href="/view-mode">
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-lg"
                  aria-label="API"
                >
                  <BookOpenText className="size-5" />
                </Button>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right" sideOffset={5}>
              View Mode
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-lg"
                aria-label="Documentation"
              >
                <Book className="size-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right" sideOffset={5}>
              Documentation
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-lg"
                aria-label="Settings"
              >
                <Settings2 className="size-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right" sideOffset={5}>
              Settings
            </TooltipContent>
          </Tooltip>
        </nav>
        <nav className="mt-auto grid gap-1 p-2">
          <ProfileDropdown />
        </nav>
      </aside>
    </div>
  );
}
