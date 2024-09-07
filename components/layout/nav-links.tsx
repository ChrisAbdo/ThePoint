"use client";
import React from "react";
import Link from "next/link";
import { HistoryButton } from "./history-button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Plus, BookOpenText, Book, Settings2 } from "lucide-react";
import { usePathname } from "next/navigation";

interface HistoryItem {
  id: string;
  title: string;
  category: string;
}

export default function NavLinks({ history }: { history: HistoryItem[] }) {
  const pathname = usePathname();
  return (
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
              className={`rounded-lg ${
                pathname === "/view-mode"
                  ? "bg-[#ececee] dark:bg-[#FFFFFF17]"
                  : ""
              }`}
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
  );
}
