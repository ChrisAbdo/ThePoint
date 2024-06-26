import { DotsHorizontalIcon, EyeOpenIcon } from "@radix-ui/react-icons";
import { formatDistanceToNow } from "date-fns";
import { Button } from "../ui/button";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function DisplayPosts({ posts }) {
  return (
    <ul role="list" className="divide-y divide-gray-100">
      {posts.map((post) => (
        <li
          key={post.id}
          className="flex flex-wrap items-center justify-between gap-x-6 gap-y-4 py-5 sm:flex-nowrap"
        >
          <div>
            <p className="text-sm font-semibold leading-6 text-gray-900">
              <a href={`/point/${post.id}`} className="hover:underline">
                {post.title}
              </a>
            </p>
            <div className="mt-1 flex items-center gap-x-2 text-xs leading-5 text-gray-500">
              <p>
                <time dateTime={post.dateTime}>
                  {formatDistanceToNow(new Date(post.createdAt), {
                    addSuffix: true,
                  })}
                </time>
              </p>
            </div>
          </div>
          <dl className="flex w-full flex-none justify-between gap-x-8 sm:w-auto">
            <div className="space-x-2 items-center flex">
              <Link href={`/point/${post.id}`}>
                <Button variant="secondary">View</Button>
              </Link>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <DotsHorizontalIcon className="size-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {/* @ts-ignore */}
                  <DropdownMenuItem>Copy Link</DropdownMenuItem>
                  {/* @ts-ignore */}
                  <DropdownMenuItem>Edit</DropdownMenuItem>
                  {/* @ts-ignore */}
                  <DropdownMenuItem>Delete</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </dl>
        </li>
      ))}
    </ul>
  );
}
