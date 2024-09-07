"use client";

import React, { useState, useMemo, useCallback } from "react";
import { TransitionPanel } from "./transition-panel";
import ViewOnly from "@/components/editor/view-only";
import { JSONContent } from "novel";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

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

export function CategoryPanel({ points, categories }: CategoryPanelProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const pointsByCategory = useMemo(() => {
    return points.reduce((acc, point) => {
      if (!acc[point.category]) {
        acc[point.category] = [];
      }
      acc[point.category].push(point);
      return acc;
    }, {} as Record<string, Point[]>);
  }, [points]);

  const handleCategoryClick = useCallback((index: number) => {
    setActiveIndex(index);
  }, []);

  return (
    <div className="">
      <ScrollArea>
        <div className="flex space-x-2 overflow-x-auto p-3 bg-transparent">
          {categories.map((category, index) => (
            <button
              key={category}
              onClick={() => handleCategoryClick(index)}
              className={`rounded-md px-3 py-1 text-sm font-medium whitespace-nowrap ${
                activeIndex === index
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
      <div className="border-border">
        <TransitionPanel
          activeIndex={activeIndex}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          variants={{
            enter: { opacity: 0, y: -20 },
            center: { opacity: 1, y: 0 },
            exit: { opacity: 0, y: 20 },
          }}
        >
          {categories.map((category) => (
            <CategoryContent
              key={category}
              category={category}
              points={pointsByCategory[category] || []}
            />
          ))}
        </TransitionPanel>
      </div>
    </div>
  );
}

type CategoryContentProps = {
  category: string;
  points: Point[];
};

const CategoryContent = React.memo(function CategoryContent({
  points,
}: CategoryContentProps) {
  return (
    <ScrollArea className="h-[calc(100vh)] overflow-y-auto pr-4">
      <div className="py-2 space-y-8">
        {points.map((point) => (
          <PointItem key={point.id} point={point} />
        ))}
      </div>
    </ScrollArea>
  );
});

type PointItemProps = {
  point: Point;
};

const PointItem = React.memo(function PointItem({ point }: PointItemProps) {
  const contentJSON = useMemo(() => {
    try {
      return JSON.parse(point.content) as JSONContent;
    } catch (error) {
      console.error("Failed to parse point content:", error);
      return {} as JSONContent;
    }
  }, [point.content]);

  return (
    <div className="p-4 mx-auto max-w-4xl border-b">
      <h4 className="text-lg font-semibold text-card-foreground mb-2 z-50">
        {point.title}
      </h4>
      <ViewOnly initialValue={contentJSON} />
      <time className="text-sm text-muted-foreground block mt-2">
        {new Date(point.createdAt).toLocaleDateString()}
      </time>
    </div>
  );
});

export default CategoryPanel;
