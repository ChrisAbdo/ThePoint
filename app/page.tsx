import AuthDrawer from "@/components/auth/auth-drawer";
import ViewOnly from "@/components/editor/view-only";
import Topbar from "@/components/user/topbar";
import { introMessage } from "@/lib/intro-message";

export default function Home() {
  return (
    <div>
      {/* <Topbar /> */}
      <AuthDrawer />
      <div className="p-4">
        <ViewOnly initialValue={introMessage} />
      </div>
    </div>
  );
}
