"use client";

import React, { useState, useMemo, useCallback } from "react";
import { TransitionPanel } from "./transition-panel";
import ViewOnly from "@/components/editor/view-only";
import { JSONContent } from "novel";

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
    <div className="mt-4">
      <div className="mb-4 flex space-x-2">
        {categories.map((category, index) => (
          <button
            key={category}
            onClick={() => handleCategoryClick(index)}
            className={`rounded-md px-3 py-1 text-sm font-medium ${
              activeIndex === index
                ? "bg-zinc-200 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100"
                : "bg-zinc-100 text-zinc-600 dark:bg-zinc-700 dark:text-zinc-400"
            }`}
          >
            {category}
          </button>
        ))}
      </div>
      <div className="overflow-hidden border-t border-zinc-200 dark:border-zinc-700">
        <TransitionPanel
          activeIndex={activeIndex}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          variants={{
            enter: { opacity: 0, y: -50, filter: "blur(4px)" },
            center: { opacity: 1, y: 0, filter: "blur(0px)" },
            exit: { opacity: 0, y: 50, filter: "blur(4px)" },
          }}
        >
          {categories.map((category, index) => (
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
  category,
  points,
}: CategoryContentProps) {
  return (
    <div className="py-2 space-y-8">
      <h3 className="mb-2 font-medium text-zinc-800 dark:text-zinc-100">
        {category}
      </h3>
      {points.map((point) => (
        <PointItem key={point.id} point={point} />
      ))}
    </div>
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
    <div className="bg-background px-4 py-5 sm:px-6">
      <h4 className="text-lg font-semibold text-primary mb-2">{point.title}</h4>
      <ViewOnly initialValue={contentJSON} />
      <time className="text-sm text-muted-foreground block mt-2">
        {new Date(point.createdAt).toLocaleDateString()}
      </time>
    </div>
  );
});
