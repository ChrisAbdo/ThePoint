"use client";

import Editor from "@/components/editor/advanced-editor";
import { JSONContent } from "novel";
import { useState, useEffect } from "react";
import { defaultValue } from "@/lib/default-value";
import { createPoint, getCategories } from "../actions";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import CategorySwitcher from "@/components/user/category-switcher";

export default function Home() {
  const { data: session } = useSession();
  const [value, setValue] = useState<JSONContent>(defaultValue);
  const [categories, setCategories] = useState([]);
  const router = useRouter();
  const searchParams = useSearchParams();
  const category = searchParams.get("category") || "";

  const handleSubmit = async (formData: FormData) => {
    // if (!category) {
    //   toast.error("Please select a category");
    //   return;
    // }
    // formData.append("category", category);

    try {
      const result = await createPoint(formData);
      if (result?.error) {
        console.error("Error details:", result.details);
        toast.error(`Failed to create point: ${result.error}`);
      } else {
        toast.success("Snippet created successfully. Redirecting...");
        router.push("/profile");
      }
    } catch (error) {
      console.error("Submission error:", error);
      toast.error("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div className="p-6">
      <div className="space-y-12">
        <div className="pb-12">
          <h2 className="text-base font-semibold leading-7 text-primary">
            Create a new point
          </h2>
          <p className="mt-1 text-sm leading-6 text-muted-foreground">
            Anyone with the link can view this point.
          </p>

          <Separator className="mt-2" />

          <div className="sm:col-span-4">
            <label
              htmlFor="category"
              className="block text-sm font-medium leading-6 text-primary"
            >
              Category
            </label>
            <div className="mt-2">
              <CategorySwitcher categories={categories} />
            </div>
          </div>

          <form
            onSubmit={async (e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              await handleSubmit(formData);
            }}
          >
            <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-4">
                <label
                  htmlFor="title"
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
                  htmlFor="content"
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
              </div>
            </div>
            <div className="mt-4">
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
