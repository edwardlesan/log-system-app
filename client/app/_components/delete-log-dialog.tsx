"use client";

import { toast } from "sonner";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Trash } from "lucide-react";
import { deleteLog } from "../_actions/actions";

interface DeleteLogDialogProps {
  logId: number;
  onLogDeleted: (logId: number) => void;
}

export function DeleteLogDialog({ logId, onLogDeleted }: DeleteLogDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  async function onDelete() {
    setIsDeleting(true);

    try {
      await deleteLog(logId);

      onLogDeleted(logId);

      toast.success("Log deleted successfully!", {
        description: "The log has been permanently removed from the system.",
      });

      setIsOpen(false);
    } catch (error) {
      toast.error("Failed to delete log", {
        description:
          error instanceof Error
            ? error.message
            : "An unexpected error occurred. Please try again.",
      });
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="flex items-center gap-2 justify-start text-red-600"
        >
          <Trash className="h-4 w-4" />
          Delete
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-red-600">Delete Log</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this log? This action cannot be
            undone. The log will be permanently removed from the system.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="flex justify-end gap-2">
          <DialogClose asChild>
            <Button variant="outline" disabled={isDeleting}>
              Cancel
            </Button>
          </DialogClose>
          <Button
            variant="destructive"
            onClick={onDelete}
            disabled={isDeleting}
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
