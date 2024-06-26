"use client";
import { CopyIcon } from "@radix-ui/react-icons";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { toast } from "sonner";
export function SharePoint({ point }: { point: string }) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="secondary">Share</Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-[520px]">
        <div className="flex flex-col space-y-2 text-center sm:text-left">
          <h3 className="text-lg font-semibold">Share Point</h3>
          <p className="text-sm text-muted-foreground">
            Anyone who has this link will be able to view this.
          </p>
        </div>
        <div className="flex items-center space-x-2 pt-4">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="link" className="sr-only">
              Link
            </Label>
            <Input
              id="link"
              // @ts-ignore
              defaultValue={`https://example.com/${point.id}`}
              readOnly
              className="h-9"
            />
          </div>
          <Button
            size="sm"
            className="px-3"
            onClick={() => {
              navigator.clipboard.writeText(`https://example.com/${point.id}`);
              toast.success("Link copied to clipboard");
            }}
          >
            <span className="sr-only">Copy</span>
            <CopyIcon className="size-4" />
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
