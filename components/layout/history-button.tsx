"use client";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { IconHistory } from "../ui/icons";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useState, useEffect } from "react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";
import { DotsVerticalIcon } from "@radix-ui/react-icons";
import { Share, ShareIcon, Trash } from "lucide-react";

interface HistoryItem {
  id: string;
  title: string;
  category: string;
}

export function HistoryButton({ history }: { history: HistoryItem[] }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.metaKey && event.key === "b") {
        event.preventDefault();
        setOpen((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <Tooltip delayDuration={0}>
        <TooltipTrigger asChild>
          <PopoverTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-lg"
              aria-label="History"
            >
              <IconHistory className="size-5" />
            </Button>
          </PopoverTrigger>
        </TooltipTrigger>
        <TooltipContent side="right" sideOffset={5}>
          History
          <kbd className="ml-2 pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
            <span className="text-xs">⌘</span>
          </kbd>
          <kbd className="ml-1 pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
            <span className="text-xs">B</span>
          </kbd>
        </TooltipContent>
      </Tooltip>
      <PopoverContent className="w-[325px] p-0" align="start" side="right">
        <Command>
          <CommandInput placeholder="Search framework..." className="h-9" />
          <CommandList>
            <CommandEmpty>No framework found.</CommandEmpty>
            <CommandGroup>
              {history.map((item: HistoryItem) => (
                <CommandItem
                  key={item.title + item.category}
                  value={`${item.title} ${item.category}`}
                  onSelect={() => {
                    router.push(`/point/${item.id}`);
                  }}
                  className="flex items-center justify-between"
                >
                  <>{item.title}</>
                  <div className="flex gap-1">
                    <Badge variant="outline">{item.category}</Badge>
                    <DropdownMenu>
                      <DropdownMenuTrigger>
                        <Button
                          variant="ghost"
                          size="xs"
                          className="rounded-lg"
                          aria-label="More"
                        >
                          <DotsVerticalIcon className="size-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="start" sideOffset={5}>
                        <DropdownMenuItem>
                          <ShareIcon className="size-4 mr-4" />
                          Share Chat
                        </DropdownMenuItem>
                        <DropdownMenuItem className="focus:bg-red-100">
                          <Trash className="size-4 mr-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
