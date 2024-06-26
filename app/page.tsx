"use client";

import Editor from "@/components/editor/advanced-editor";
import { JSONContent } from "novel";
import { useState } from "react";
import { defaultValue } from "@/lib/default-value";
import { createPoint } from "./actions";
import { Input } from "@/components/ui/input";

export default function Home() {
  const [value, setValue] = useState<JSONContent>(defaultValue);

  return (
    <div>
      <form action={createPoint}>
        <h1>Home</h1>
        <Input name="name" />
        <Editor initialValue={value} onChange={setValue} />
        <input type="hidden" name="content" value={JSON.stringify(value)} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
