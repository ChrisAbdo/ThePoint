import { defaultValue } from "@/lib/default-value";
import ViewOnly from "@/components/editor/view-only";

export default function Home() {
  return (
    <div className="mt-4">
      <ViewOnly initialValue={defaultValue} />
    </div>
  );
}
