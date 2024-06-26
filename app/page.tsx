import ViewOnly from "@/components/editor/view-only";
import { introMessage } from "@/lib/intro-message";

export default function Home() {
  return (
    <div className="mt-4">
      <ViewOnly initialValue={introMessage} />
    </div>
  );
}
