import { AppSidebar } from "@/components/sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { api, HydrateClient } from "@/trpc/server";

const RootLayout: React.FC<{ children: React.ReactNode }> = async ({
  children,
}) => {
  await api.users.getCurrent.prefetch();
  await api.spaces.getCurrent.prefetch();

  return (
    <HydrateClient>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>{children}</SidebarInset>
      </SidebarProvider>
    </HydrateClient>
  );
};

export default RootLayout;
