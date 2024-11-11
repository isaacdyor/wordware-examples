import { DropdownMenuItem } from "@/components/ui/dropdown-menu";

import { api } from "@/trpc/react";
import { Archive } from "lucide-react";
import { toast } from "sonner";

export function ArchiveButton({ id }: { id: string }) {
  const utils = api.useUtils();
  const { mutate: archiveConversation } = api.conversations.archive.useMutation(
    {
      onSuccess: async () => {
        await utils.users.getCurrent.invalidate();
        toast.success("Conversation archived");
      },
    },
  );

  return (
    <DropdownMenuItem
      onClick={(e) => {
        e.preventDefault();
        archiveConversation({ id, archived: true });
      }}
    >
      <Archive className="text-muted-foreground" />
      <span>Archive</span>
    </DropdownMenuItem>
  );
}
