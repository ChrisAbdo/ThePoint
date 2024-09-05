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
import { useState } from "react";
import {
  Command,
  CommandInput,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command";

const historyItems = [
  { id: 1, label: "Fix Tooltip Popover Combo" },
  { id: 2, label: "Tooltip Error Explanation" },
  { id: 3, label: "Category Switcher Error" },
  { id: 4, label: "TailwindUI to Shadcnui" },
  { id: 5, label: "Collapsible Sidebar Design" },
  { id: 6, label: "Vercel to Railway Migration" },
  { id: 7, label: "Vercel FFmpeg Error" },
];

export function HistoryButton() {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <Tooltip>
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
        </TooltipContent>
      </Tooltip>
      <PopoverContent className="w-[300px] p-0" side="right">
        <Command>
          <CommandInput placeholder="Search history..." />
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup>
            {historyItems.map((item) => (
              <CommandItem
                key={item.id}
                onSelect={() => {
                  console.log(`Selected: ${item.label}`);
                  setOpen(false);
                }}
              >
                {item.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
