"use client";

import Editor from "@/components/editor/advanced-editor";
import { JSONContent } from "novel";
import { useState } from "react";
import { defaultValue } from "@/lib/default-value";
import { createPoint } from "@/app/actions";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import CategorySwitcher from "@/components/user/category-switcher";

export default function Root({ categories }: { categories: any[] }) {
  const { data: session } = useSession();
  const [value, setValue] = useState<JSONContent>(defaultValue);
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState("General");

  const handleSubmit = async (formData: FormData) => {
    if (!selectedCategory) {
      toast.error("Please select a category");
      return;
    }
    formData.append("category", selectedCategory);

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

          <div className="flex-1 sm:flex-[0.25]">
            <label
              htmlFor="category"
              className="block text-sm font-medium leading-6 text-primary"
            >
              Category
            </label>
            <div className="mt-2">
              <CategorySwitcher
                categories={categories}
                onChange={(categoryId) => setSelectedCategory(categoryId)}
              />
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
              <div className="sm:col-span-6 flex items-center justify-between space-x-4">
                <div className="flex-1">
                  <label
                    htmlFor="title"
                    className="block text-sm font-medium leading-6 text-primary"
                  >
                    Title
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm sm:max-w-md">
                      <Input
                        name="title"
                        className="w-full"
                        placeholder="How to make a real-time chat app with Next.js"
                      />
                    </div>
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

            <input type="hidden" name="category" value={selectedCategory} />
          </form>
        </div>
      </div>
    </div>
  );
}
