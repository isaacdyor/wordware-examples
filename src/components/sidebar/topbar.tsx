import { SidebarTrigger } from "../ui/sidebar";

export function Topbar({
  children,
  topbarContent,
}: {
  children: React.ReactNode;
  topbarContent?: React.ReactNode;
}) {
  return (
    <>
      <div className="sticky top-0 z-20 flex w-full items-center justify-between bg-background p-2">
        <SidebarTrigger className="size-4 bg-background" />
        {topbarContent}
      </div>
      <div className="p-4 pt-0">{children}</div>
    </>
  );
}
