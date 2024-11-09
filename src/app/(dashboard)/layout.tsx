import { AppSidebar } from "@/components/sidebar";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { getUser } from "@/lib/supabase/server";
import { UserProvider } from "@/providers/auth-provider";
import { api } from "@/trpc/server";

const RootLayout: React.FC<{ children: React.ReactNode }> = async ({
  children,
}) => {
  const { user } = await getUser();
  if (!user) return null;

  const conversations = await api.conversations.getAll();

  return (
    <UserProvider user={user}>
      <SidebarProvider>
        <AppSidebar conversations={conversations} />
        <SidebarInset>
          <div className="sticky top-0 z-20 w-full bg-background">
            <SidebarTrigger className="ml-2 mt-2 size-4 bg-background" />
          </div>
          <div className="h-full p-4 pt-0">{children}</div>
        </SidebarInset>
      </SidebarProvider>
    </UserProvider>
  );
};

export default RootLayout;
