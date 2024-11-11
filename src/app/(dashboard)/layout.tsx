import { AppSidebar } from "@/components/sidebar";
import { api, HydrateClient } from "@/trpc/server";

const RootLayout: React.FC<{ children: React.ReactNode }> = async ({
  children,
}) => {
  await api.users.getCurrent.prefetch();

  return (
    <HydrateClient>
      <AppSidebar>{children}</AppSidebar>
    </HydrateClient>
  );
};

export default RootLayout;
