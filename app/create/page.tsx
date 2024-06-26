"use client";

import Editor from "@/components/editor/advanced-editor";
import { JSONContent } from "novel";
import { useState } from "react";
import { defaultValue } from "@/lib/default-value";
import { createPoint } from "../actions";
import { Input } from "@/components/ui/input";

export default function Home() {
  const [value, setValue] = useState<JSONContent>(defaultValue);

  return (
    <div className="max-w-4xl mx-auto mt-12">
      {/* <form action={createPoint}>
        <h1>Home</h1>
        <Input name="name" />
        <Editor initialValue={value} onChange={setValue} />
        <input type="hidden" name="content" value={JSON.stringify(value)} />
        <button type="submit">Submit</button>
      </form> */}
      <div className="space-y-12">
        <div className="pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Create a new point
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            Anyone with a link can view this point.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <label
                htmlFor="username"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Title
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <Input
                    name="name"
                    placeholder="How to make a real-time chat app with Next.js"
                  />
                </div>
              </div>
            </div>

            <div className="col-span-full">
              <label
                htmlFor="about"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Content
              </label>
              <div className="mt-2">
                <Editor initialValue={value} onChange={setValue} />
                <input
                  type="hidden"
                  name="content"
                  value={JSON.stringify(value)}
                />
              </div>
              <p className="mt-3 text-sm leading-6 text-gray-600">
                Write a few sentences about yourself.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
