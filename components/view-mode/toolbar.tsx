"use client";

import React, {
  useEffect,
  useRef,
  useState,
  useMemo,
  useCallback,
  Suspense,
} from "react";
import { useReducedMotion } from "framer-motion";
import dynamic from "next/dynamic";
import useMeasure from "react-use-measure";
import { AnimatePresence, motion, MotionConfig } from "framer-motion";
import { cn } from "@/lib/utils";
import useClickOutside from "@/lib/hooks/useClickOutside";
import { Calendar } from "@/components/ui/calendar";
import { BookmarkIcon, MagicWandIcon } from "@radix-ui/react-icons";
import { CalendarIcon, DownloadIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "../ui/skeleton";

// Correctly import the AIContext component
// const AIContext = dynamic(
//   () => import("./ai-context").then((mod) => mod.AIContext),
//   {
//     loading: () => <Skeleton className="w-full h-12" />,
//   }
// );
import { AIContext } from "./ai-context";

const transition = {
  type: "spring",
  bounce: 0.1,
  duration: 0.25,
};

type Point = {
  id: string;
  title: string;
  content: string;
  category: string;
  createdAt: Date;
};

type CategoryPanelProps = {
  points: Point[];
  categories: string[];
};

export default function ToolbarExpandable({
  points,
  categories,
}: CategoryPanelProps) {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [active, setActive] = useState<number | null>(null);
  const [contentRef, { height: heightContent }] = useMeasure();
  const [menuRef, { width: widthContainer }] = useMeasure();
  const ref = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [maxWidth, setMaxWidth] = useState(0);
  const [containerWidth, setContainerWidth] = useState("auto");

  const shouldReduceMotion = useReducedMotion();

  useClickOutside(ref, () => {
    setIsOpen(false);
    setActive(null);
  });

  useEffect(() => {
    if (!widthContainer || maxWidth > 0) return;
    setMaxWidth(widthContainer);
  }, [widthContainer, maxWidth]);

  useEffect(() => {
    setContainerWidth(isOpen ? "500px" : "185px");
  }, [isOpen]);

  const ITEMS = useMemo(
    () => [
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
          <Suspense fallback={<Skeleton className="w-full" />}>
            <AIContext points={points} categories={categories} />
          </Suspense>
        ),
      },
      {
        id: 3,
        label: "Bookmarks",
        title: <BookmarkIcon className="size-5" />,
        content: <div className="w-fit">Bookmarks content here</div>,
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
              <Button
                size="sm"
                variant="secondary"
                className="w-full dark hover:bg-[#FFFFFF17]"
              >
                PDF
              </Button>
              <Button
                size="sm"
                variant="secondary"
                className="w-full dark hover:bg-[#FFFFFF17]"
              >
                Markdown
              </Button>
            </div>
          </div>
        ),
      },
    ],
    [date, setDate]
  );

  const handleItemClick = useCallback(
    (itemId: number) => {
      if (!isOpen) setIsOpen(true);
      if (active === itemId) {
        setIsOpen(false);
        setActive(null);
        return;
      }
      setActive(itemId);
    },
    [isOpen, active]
  );

  return (
    <MotionConfig
      transition={shouldReduceMotion ? { duration: 0 } : transition}
    >
      <motion.div
        className="fixed bottom-8 left-1/2 transform -translate-x-1/2"
        ref={ref}
        animate={{ width: containerWidth }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <div className="h-full w-full rounded-xl border border-zinc-950/10 bg-primary shadow-lg">
          <div className="overflow-hidden">
            <AnimatePresence initial={false} mode="sync">
              {isOpen && (
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
              )}
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
                  onClick={() => handleItemClick(item.id)}
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
