"use client";

import React from "react";
import { EditorRoot, EditorContent, type JSONContent } from "novel";
import { defaultExtensions } from "./vo-extensions";

interface EditorProp {
  initialValue?: JSONContent;
}

const extensions = [...defaultExtensions];

export default function ViewOnly({ initialValue }: EditorProp) {
  return (
    <EditorRoot>
      <EditorContent
        editable={false}
        className="prose prose-lg dark:prose-invert prose-headings:font-title font-default focus:outline-none max-w-full p-4 rounded-xl"
        initialContent={initialValue}
        extensions={extensions}
        editorProps={{
          attributes: {
            class: `prose prose-lg dark:prose-invert prose-headings:font-title font-default focus:outline-none max-w-full`,
          },
        }}
      />
    </EditorRoot>
  );
}
