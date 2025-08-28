"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import {
  defaultLogFormValues,
  LogFormData,
  LogFormSchema,
} from "../_utils/form.schemas";
import { createLog } from "../_actions/actions";
import { TLog } from "../_models/model";

interface AddLogDialogProps {
  onLogAdded: (newLog: TLog) => void;
}

export function AddLogDialog({ onLogAdded }: AddLogDialogProps) {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<LogFormData>({
    resolver: zodResolver(LogFormSchema),
    defaultValues: defaultLogFormValues,
  });

  async function onSubmit(data: LogFormData) {
    setIsSubmitting(true);

    try {
      const newLog = await createLog(data);

      onLogAdded(newLog);

      toast.success("Log created successfully!", {
        description: `Log "${newLog.log_text}" has been added.`,
      });

      form.reset();
      setOpen(false);
    } catch (error) {
      toast.error("Failed to create log", {
        description:
          error instanceof Error
            ? error.message
            : "An unexpected error occurred. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="size-4" /> Add log
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <DialogHeader>
            <DialogTitle>Add a new log</DialogTitle>
            <DialogDescription>
              Fill in the information below and click submit to add a new log.
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <FormField
              control={form.control}
              name="log_text"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Log Text</FormLabel>
                  <FormControl>
                    <Input placeholder="Insert log text" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is the displayed log text
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="owner"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Owner</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Insert the owner of the log"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    This is the owner of the written log
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </Form>

          <DialogFooter className="flex justify-end gap-2">
            <DialogClose asChild>
              <Button variant="outline" disabled={isSubmitting}>
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Creating..." : "Submit"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
