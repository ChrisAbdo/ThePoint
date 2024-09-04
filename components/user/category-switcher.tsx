"use client";

import * as React from "react";
import { Check, ChevronsUpDown, PlusCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getCategories, createCategory } from "@/app/actions";

export default function CategorySwitcher({ categories = [] }) {
  const [open, setOpen] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get("category") || "general";
  useEffect(() => {
    async function fetchCategories() {
      try {
        const result = await getCategories();
        if (result.success && Array.isArray(result.categories)) {
          setCategories([
            { id: "general", name: "General" },
            ...result.categories,
          ]);
        } else {
          console.error("Failed to fetch categories:", result.error);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    }
    fetchCategories();
  }, []);

  const handleCreateCategory = async () => {
    if (newCategoryName.trim()) {
      try {
        const result = await createCategory(newCategoryName.trim());
        if (result.success) {
          setNewCategoryName("");
          setDialogOpen(false);
          const updatedCategories = await getCategories();
          if (
            updatedCategories.success &&
            Array.isArray(updatedCategories.categories)
          ) {
            setCategories([
              { id: "general", name: "General" },
              ...updatedCategories.categories,
            ]);
          }
        } else {
          console.error("Failed to create category:", result.error);
        }
      } catch (error) {
        console.error("Error creating category:", error);
      }
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {currentCategory
            ? categories.find((category) => category.id === currentCategory)
                ?.name || "Select category..."
            : "Select category..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search category..." />
          <CommandEmpty>No category found.</CommandEmpty>
          <CommandGroup>
            {categories.map((category) => (
              <CommandItem
                key={category.id}
                value={category.id}
                onSelect={() => {
                  router.push(`/create?category=${category.id}`);
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    currentCategory === category.id
                      ? "opacity-100"
                      : "opacity-0"
                  )}
                />
                {category.name}
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandGroup>
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" className="w-full justify-start">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Create Category
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create New Category</DialogTitle>
                  <DialogDescription>
                    Enter a name for your new category.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      Name
                    </Label>
                    <Input
                      id="name"
                      value={newCategoryName}
                      onChange={(e) => setNewCategoryName(e.target.value)}
                      className="col-span-3"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button onClick={handleCreateCategory}>Create</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
