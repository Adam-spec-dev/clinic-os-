import Sidebar from "@/components/Sidebar";
import DashboardHUD from "@/components/DashboardHUD";

export default function Home() {
  return (
    <>
      <Sidebar />
      <main className="flex-1 overflow-y-auto p-10">
        <DashboardHUD />
      </main>
    </>
  );
}
