"use client";
import Editor from "@/components/editor/advanced-editor";
import { JSONContent } from "novel";
import { useState } from "react";
import { defaultValue } from "@/lib/default-value";

export default function Home() {
  const [value, setValue] = useState<JSONContent>(defaultValue);

  return (
    <div>
      <h1>Home</h1>
      <Editor initialValue={value} onChange={setValue} />
    </div>
  );
}
