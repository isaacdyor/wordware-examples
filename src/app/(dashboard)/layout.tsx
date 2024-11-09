import { AppSidebar } from "@/components/sidebar";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { getUser } from "@/lib/supabase/server";
import { api, HydrateClient } from "@/trpc/server";

const RootLayout: React.FC<{ children: React.ReactNode }> = async ({
  children,
}) => {
  await api.users.getCurrent.prefetch();
  const user = await api.users.getCurrent();
  console.log(user);

  return (
    <HydrateClient>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <div className="sticky top-0 z-20 w-full bg-background">
            <SidebarTrigger className="ml-2 mt-2 size-4 bg-background" />
          </div>
          <div className="h-full p-4 pt-0">{children}</div>
        </SidebarInset>
      </SidebarProvider>
    </HydrateClient>
  );
};

export default RootLayout;
