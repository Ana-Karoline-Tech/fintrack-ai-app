import { Sidebar } from "@/src/components/common/sidebar";
import { Header } from "@/src/components/common/header";
import { auth } from "@/src/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/sign-in");
  }

  return (
    <div className="flex min-h-screen bg-[#0F111A] font-sans">
      <Sidebar />
      <div className="flex flex-1 flex-col">
        <Header
          userName={session.user.name}
          userImage={session.user.image}
          date={new Date()}
        />
        {children}
      </div>
    </div>
  );
}
