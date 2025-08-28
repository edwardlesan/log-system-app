"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
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
import { Edit } from "lucide-react";
import {
  defaultLogFormValues,
  fetchLogById,
  LogFormData,
  LogFormSchema,
} from "../_utils/form.schemas";

interface EditLogDialogProps {
  logId: number;
}

export function EditLogDialog({ logId }: EditLogDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<LogFormData>({
    resolver: zodResolver(LogFormSchema),
    defaultValues: defaultLogFormValues,
  });

  useEffect(() => {
    if (isOpen) {
      loadLogData();
    }
  }, [isOpen]);

  async function loadLogData() {
    setIsLoading(true);
    try {
      const logData = await fetchLogById(logId);
      form.setValue("logText", logData.logText);
      form.setValue("owner", logData.owner);
    } catch (error) {
      toast.error("Failed to load log data");
    } finally {
      setIsLoading(false);
    }
  }

  function onSubmit(data: LogFormData) {
    toast("Log updated successfully", {
      description: (
        <pre className="mt-2 w-[320px] rounded-md bg-neutral-950 p-4">
          <code className="text-white">
            {JSON.stringify({ id: logId, ...data }, null, 2)}
          </code>
        </pre>
      ),
    });

    setIsOpen(false);
    form.reset();
  }

  function handleCancel() {
    setIsOpen(false);
    form.reset();
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="flex items-center gap-2 justify-start"
        >
          <Edit className="h-4 w-4" />
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <DialogHeader>
            <DialogTitle>Edit log</DialogTitle>
            <DialogDescription>
              Update the information below and click save changes to modify the
              log.
            </DialogDescription>
          </DialogHeader>

          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <div className="text-sm text-muted-foreground">
                Loading log data...
              </div>
            </div>
          ) : (
            <Form {...form}>
              <FormField
                control={form.control}
                name="logText"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Log Text</FormLabel>
                    <FormControl>
                      <Input placeholder="Insert log" {...field} />
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
          )}

          <DialogFooter className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              Save changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
