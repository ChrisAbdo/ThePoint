"use client";
// .
import * as React from "react";
import {
  CaretSortIcon,
  CheckIcon,
  PlusCircledIcon,
} from "@radix-ui/react-icons";

import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { createCategory } from "@/app/actions";

type PopoverTriggerProps = React.ComponentPropsWithoutRef<
  typeof PopoverTrigger
>;

interface CategorySwitcherProps extends PopoverTriggerProps {
  categories: { id: string; name: string }[];
}

export default function CategorySwitcher({
  className,
  categories,
  onChange,
}: CategorySwitcherProps) {
  const allCategories = [
    { label: "General", value: "General" },
    ...categories.map((category) => ({
      label: category.name,
      value: category.name,
    })),
  ];

  const groups = [
    {
      label: "Categories",
      categories: allCategories,
    },
  ];

  type Category = (typeof groups)[number]["categories"][number];

  const [open, setOpen] = React.useState(false);
  const [showNewCategoryDialog, setShowNewCategoryDialog] =
    React.useState(false);
  const [selectedCategory, setSelectedCategory] = React.useState<Category>(
    allCategories[0]
  );

  return (
    <Dialog
      open={showNewCategoryDialog}
      onOpenChange={setShowNewCategoryDialog}
    >
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            aria-label="Select a category"
            className={cn("w-[200px] justify-between", className)}
          >
            <Avatar className="mr-2 h-5 w-5">
              <AvatarImage
                src={`https://avatar.vercel.sh/${selectedCategory.value}.png`}
                alt={selectedCategory.label}
              />
              <AvatarFallback>SC</AvatarFallback>
            </Avatar>
            {selectedCategory.label}
            <CaretSortIcon className="ml-auto h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput placeholder="Search category..." />
            <CommandList>
              <CommandEmpty>No category found.</CommandEmpty>
              {groups.map((group) => (
                <CommandGroup key={group.label} heading={group.label}>
                  {group.categories.map((category) => (
                    <CommandItem
                      key={category.value}
                      onSelect={() => {
                        setSelectedCategory(category);
                        setOpen(false);
                        // @ts-ignore
                        onChange?.(category.value);
                      }}
                      className="text-sm"
                    >
                      <Avatar className="mr-2 h-5 w-5">
                        <AvatarImage
                          src={`https://avatar.vercel.sh/${category.value}.png`}
                          alt={category.label}
                        />
                        <AvatarFallback>SC</AvatarFallback>
                      </Avatar>
                      {category.label}
                      <CheckIcon
                        className={cn(
                          "ml-auto h-4 w-4",
                          selectedCategory.value === category.value
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                    </CommandItem>
                  ))}
                </CommandGroup>
              ))}
            </CommandList>
            <CommandSeparator />
            <CommandList>
              <CommandGroup>
                <DialogTrigger asChild>
                  <CommandItem
                    onSelect={() => {
                      setOpen(false);
                      setShowNewCategoryDialog(true);
                    }}
                  >
                    <PlusCircledIcon className="mr-2 h-5 w-5" />
                    Create Category
                  </CommandItem>
                </DialogTrigger>
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <DialogContent>
        <form action={createCategory}>
          <DialogHeader>
            <DialogTitle>Create category</DialogTitle>
            <DialogDescription>
              Add a new category to organize your content.
            </DialogDescription>
          </DialogHeader>
          <div>
            <div className="space-y-4 py-2 pb-4">
              <div className="space-y-2">
                <Label htmlFor="name">Category name</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Enter category name"
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowNewCategoryDialog(false)}
              type="button"
            >
              Cancel
            </Button>
            <Button type="submit">Create</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
