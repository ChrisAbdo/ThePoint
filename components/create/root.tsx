"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { JSONContent } from "novel";
import Editor from "@/components/editor/advanced-editor";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import CategorySwitcher from "@/components/user/category-switcher";
import { createPoint } from "@/app/actions";
import { defaultValue } from "@/lib/default-value";
import { useFormStatus } from "react-dom";
import LoadingSpinner from "./loading-spinner";

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <>
      {pending ? (
        <Button type="submit" className="float-right">
          <LoadingSpinner />
        </Button>
      ) : (
        <Button type="submit" className="float-right">
          Create
        </Button>
      )}
    </>
  );
}

export default function Root({ categories }: { categories: any[] }) {
  const [value, setValue] = useState<JSONContent>(defaultValue);
  const [selectedCategory, setSelectedCategory] = useState("General");
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();

  async function onSubmit(formData: FormData) {
    if (!selectedCategory) {
      toast.error("Please select a category");
      return;
    }

    formData.set("category", selectedCategory);
    formData.set("content", JSON.stringify(value));

    try {
      const result = await createPoint(formData);
      if (result?.error) {
        console.error("Error details:", result.details);
        toast.error(result.error);
      } else {
        toast.success("Snippet created successfully. Redirecting...");
        router.push("/profile");
      }
    } catch (error) {
      console.error("Submission error:", error);
      toast.error("An unexpected error occurred. Please try again.");
    }
  }

  return (
    <div className="p-6">
      <div className="space-y-12">
        <div className="pb-12">
          <h2 className="text-base font-semibold leading-7 text-primary">
            Create a new point
          </h2>

          <Separator className="my-4" />

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
                onChange={(categoryValue: string) => {
                  setSelectedCategory(categoryValue);
                }}
              />
            </div>
          </div>

          <form ref={formRef} action={onSubmit}>
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
                        placeholder="Name your Point"
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
                </div>
              </div>
            </div>
            <div className="mt-4">
              <SubmitButton />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
