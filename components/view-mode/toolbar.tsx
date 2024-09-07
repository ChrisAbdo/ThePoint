"use client";

import React, { useEffect, useRef, useState } from "react";
import useMeasure from "react-use-measure";
import { AnimatePresence, motion, MotionConfig } from "framer-motion";
import { cn } from "@/lib/utils";
import useClickOutside from "@/lib/hooks/useClickOutside";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import {
  BookmarkIcon,
  MagicWandIcon,
  PersonIcon,
  Share1Icon,
} from "@radix-ui/react-icons";
import { CalendarIcon, DownloadIcon } from "@radix-ui/react-icons";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Bot } from "lucide-react";

const transition = {
  type: "spring",
  bounce: 0.1,
  duration: 0.25,
};

export default function ToolbarExpandable() {
  const [date, setDate] = useState<Date | Date[]>(new Date());
  const [active, setActive] = useState<number | null>(null);
  const [contentRef, { height: heightContent }] = useMeasure();
  const [menuRef, { width: widthContainer }] = useMeasure();
  const ref = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [maxWidth, setMaxWidth] = useState(0);
  const [containerWidth, setContainerWidth] = useState("auto");

  useClickOutside(ref, () => {
    setIsOpen(false);
    setActive(null);
  });

  useEffect(() => {
    if (!widthContainer || maxWidth > 0) return;

    setMaxWidth(widthContainer);
  }, [widthContainer, maxWidth]);

  useEffect(() => {
    if (isOpen) {
      // Set a fixed width when open, adjust this value as needed
      setContainerWidth("500px");
    } else {
      // Reset to auto width when closed
      setContainerWidth("185px");
    }
  }, [isOpen]);

  const ITEMS = [
    {
      id: 1,
      label: "Calendar",
      title: <CalendarIcon className="size-5" />,
      content: (
        <div className="flex flex-col space-y-4 items-center rounded-md">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="dark text-white"
          />
        </div>
      ),
    },
    {
      id: 2,
      label: "AI Assistant",
      title: <MagicWandIcon className="size-5" />,
      content: (
        <div className="flex flex-col space-y-4 h-[300px]">
          <div className="flex flex-col text-background">
            <span>Chat with AI Assistant</span>
          </div>
          <ScrollArea className="h-[200px] pr-2">
            <div className="space-y-2">
              <div className="flex items-center w-full max-w-fit rounded-lg py-1 text-sm text-background">
                <Bot className="size-4 mr-2" />
                <p className="break-words mt-0.5">
                  Ask anything about your Points
                </p>
              </div>

              <div className="flex items-center w-full max-w-fit rounded-lg py-1 text-sm text-background">
                <PersonIcon className="size-4 mr-2" />
                <p className="break-words mt-0.5">
                  Hey, Im having trouble with my account.
                </p>
              </div>
            </div>
          </ScrollArea>
          <div className="flex-grow"></div>
          <div className="flex">
            <Input className="w-full" placeholder="Type your message" />
          </div>
        </div>
      ),
    },
    {
      id: 3,
      label: "Bookmarks",
      title: <BookmarkIcon className="size-5" />,
      content: <div className="w-fit">test</div>,
    },
    {
      id: 4,
      label: "Export",
      title: <DownloadIcon className="size-5" />,
      content: (
        <div className="flex flex-col space-y-4">
          <div className="flex flex-col text-background">
            <span>Export Point</span>
          </div>
          <div className="flex gap-1">
            <Button size="sm" className="w-full hover:bg-[#FFFFFF17]">
              PDF
            </Button>
            <Button size="sm" className="w-full hover:bg-[#FFFFFF17]">
              Markdown
            </Button>
          </div>
        </div>
      ),
    },
  ];

  return (
    <MotionConfig transition={transition}>
      <motion.div
        className="fixed bottom-8 left-1/2 transform -translate-x-1/2"
        ref={ref}
        animate={{ width: containerWidth }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <div className="h-full w-full rounded-xl border border-zinc-950/10 bg-primary shadow-lg">
          <div className="overflow-hidden">
            <AnimatePresence initial={false} mode="sync">
              {isOpen ? (
                <motion.div
                  key="content"
                  initial={{ height: 0 }}
                  animate={{ height: heightContent || 0 }}
                  exit={{ height: 0 }}
                  transition={transition}
                >
                  <div ref={contentRef} className="p-2">
                    {ITEMS.map((item) => {
                      const isSelected = active === item.id;

                      return (
                        <motion.div
                          key={item.id}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: isSelected ? 1 : 0 }}
                          exit={{ opacity: 0 }}
                        >
                          <div
                            className={cn(
                              "px-2 pt-2 text-sm",
                              isSelected ? "block" : "hidden"
                            )}
                          >
                            {item.content}
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
          <div className="flex justify-center p-2" ref={menuRef}>
            <div className="flex space-x-2">
              {ITEMS.map((item) => (
                <button
                  key={item.id}
                  aria-label={item.label}
                  className={cn(
                    "relative flex h-9 w-9 shrink-0 scale-100 select-none appearance-none items-center justify-center rounded-lg text-background transition-colors dark:hover:bg-[#ececee] hover:bg-[#FFFFFF17] hover:text-background focus-visible:ring-2 active:scale-[0.98]",
                    active === item.id
                      ? "dark:bg-[#ececee] bg-[#FFFFFF17] text-background"
                      : ""
                  )}
                  type="button"
                  onClick={() => {
                    if (!isOpen) setIsOpen(true);
                    if (active === item.id) {
                      setIsOpen(false);
                      setActive(null);
                      return;
                    }

                    setActive(item.id);
                  }}
                >
                  {item.title}
                </button>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </MotionConfig>
  );
}
