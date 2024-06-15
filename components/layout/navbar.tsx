"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { DotIcon, RocketIcon } from "@radix-ui/react-icons";
import { useSession } from "next-auth/react";

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import AuthDrawer from "@/components/auth/auth-drawer";
import ProfileDropdown from "@/components/auth/profile-dropdown";

export default function Navbar() {
  const pathname = usePathname();

  const { data: session } = useSession();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav
        className="flex items-center justify-between px-3 py-3"
        aria-label="Global"
      >
        <div className="flex items-center gap-x-12">
          <Link href="/" className="flex items-center">
            <DotIcon className="h-5 w-5 text-foreground" />
            <span className="overflow-auto font-semibold leading-tight tracking-tight">
              The Point
            </span>
            <Badge variant="secondary" className="rounded-sm ml-2">
              Beta
            </Badge>
          </Link>
          <div className="hidden md:flex md:gap-x-12">
            <Link
              href="/upload-project"
              prefetch={false}
              className={cn(
                "text-sm font-light transition-colors hover:text-foreground/80",
                pathname === "/upload-project"
                  ? "text-foreground"
                  : "text-foreground/60",
              )}
            >
              Upload Project
            </Link>
          </div>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          >
            <span className="sr-only">Open main menu</span>
            {/* <Menu className="h-6 w-6" aria-hidden="true" /> */}
          </button>
        </div>
        <div className="flex items-center space-x-1">
          {session ? <ProfileDropdown /> : <AuthDrawer text="Log In" />}
        </div>
      </nav>
    </header>
  );
}
