import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { api } from "@/trpc/react";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button, buttonVariants } from "../../ui/button";

export function DeleteButton({ id }: { id: string }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const utils = api.useUtils();

  const { mutate: deleteConversation } = api.conversations.delete.useMutation({
    onSuccess: async () => {
      await utils.spaces.getCurrent.invalidate();
      toast.success("Conversation deleted");
      setIsDeleting(false);
      setIsOpen(false);
    },
  });
  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-full justify-start gap-2 px-2 py-1.5 text-destructive hover:text-destructive"
        >
          <Trash2 className="size-4 shrink-0" />
          <span>Delete Project</span>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete this
            conversation.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            disabled={isDeleting}
            className={buttonVariants({ variant: "destructive" })}
            onClick={(e) => {
              e.preventDefault();
              setIsDeleting(true);
              deleteConversation({ id });
            }}
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
