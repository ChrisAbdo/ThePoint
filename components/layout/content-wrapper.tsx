"use client";

import { useSelectedLayoutSegment } from "next/navigation";

export default function ContentWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const segment = useSelectedLayoutSegment();
  const isViewMode = segment === "view-mode";

  return (
    <div
      className={`grid w-full pl-[53px] ${
        isViewMode ? "" : "mx-auto max-w-5xl"
      }`}
    >
      {children}
    </div>
  );
}
