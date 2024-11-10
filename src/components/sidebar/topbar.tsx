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
      <div className="sticky top-0 z-20 flex h-10 w-full items-center justify-between bg-sidebar p-2">
        <SidebarTrigger className="size-4 bg-transparent" />
        {topbarContent}
      </div>
      <div className="bg-sidebar">
        <div className="border-t bg-background p-4 md:rounded-tl-lg md:border-l">
          {children}
        </div>
      </div>
    </>
  );
}
