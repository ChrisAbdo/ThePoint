"use client";

import Editor from "@/components/editor/advanced-editor";
import { JSONContent } from "novel";
import { useState } from "react";
import { defaultValue } from "@/lib/default-value";
import { createPoint } from "../actions";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { redirect } from "next/navigation";
import { useSession, getSession } from "next-auth/react";

export default function Home() {
  const { data: session, status } = useSession();
  const [value, setValue] = useState<JSONContent>(defaultValue);

  return (
    <div className="mt-12">
      <div className="space-y-12">
        <div className="pb-12">
          <h2 className="text-base font-semibold leading-7 text-primary">
            Create a new point
          </h2>
          <p className="mt-1 text-sm leading-6 text-muted-foreground">
            Anyone with the link can view this point.
          </p>

          {/* @ts-ignore */}
          <Separator className="mt-2" />

          <div className="mt-6 flex items-center whitespace-nowrap gap-2 text-muted-foreground font-light text-sm">
            <p>Created by</p>
            <div className="flex gap-1 items-center">
              <Avatar className="size-5">
                <AvatarImage src={session?.user?.image} />
                <AvatarFallback></AvatarFallback>
              </Avatar>
              <p>{session?.user?.name}</p>
            </div>
          </div>

          <form
            // action={createPoint}
            action={async (formData: FormData) => {
              const result = await createPoint(formData);
              if (result?.error) {
                toast.error("Something went wrong. Please try again.");
              } else {
                toast.success("Snippet created successfully. Redirecting...");
                redirect("/profile");
              }
            }}
          >
            <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-4">
                <label
                  htmlFor="username"
                  className="block text-sm font-medium leading-6 text-primary"
                >
                  Title
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <Input
                      name="title"
                      placeholder="How to make a real-time chat app with Next.js"
                    />
                  </div>
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="about"
                  className="block text-sm font-medium leading-6 text-primary"
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
                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                  Learn more about{" "}
                  <Link
                    href="https://www.markdownguide.org/basic-syntax/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-primary hover:underline"
                  >
                    how to format your content
                  </Link>
                </p>
              </div>
            </div>
            <div className="mt-8">
              <Button type="submit" className="float-right">
                Create
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
