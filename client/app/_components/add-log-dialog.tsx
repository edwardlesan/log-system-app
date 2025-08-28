"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

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

export function AddLogDialog() {
  const form = useForm<LogFormData>({
    resolver: zodResolver(LogFormSchema),
    defaultValues: defaultLogFormValues,
  });

  function onSubmit(data: LogFormData) {
    toast("You submitted the following values", {
      description: (
        <pre className="mt-2 w-[320px] rounded-md bg-neutral-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });

    form.reset();
  }

  return (
    <Dialog>
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
              name="logText"
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
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Submit</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
