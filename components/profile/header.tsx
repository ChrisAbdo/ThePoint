import { Separator } from "../ui/separator";

export default function ProfileHeader() {
  return (
    <div className="md:flex md:items-center md:justify-between mt-4">
      <div className="min-w-0 flex-1">
        <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
          Profile
        </h2>
        {/* @ts-ignore */}
        <Separator className="mt-3" />
      </div>
    </div>
  );
}
