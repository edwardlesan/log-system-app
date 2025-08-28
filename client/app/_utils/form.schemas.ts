import { object, string, infer as zodInfer } from "zod";

export const LogFormSchema = object({
  logText: string().min(2, {
    message: "Log text must be at least 2 characters.",
  }),
  owner: string().min(2, { message: "Owner must be at least 2 characters." }),
});

export type LogFormData = zodInfer<typeof LogFormSchema>;

export const defaultLogFormValues: LogFormData = {
  logText: "",
  owner: "",
};

// MOCK REQUEST
export async function fetchLogById(id: number): Promise<LogFormData> {
  await new Promise((resolve) => setTimeout(resolve, 500));

  return {
    logText: `Sample log entry for ID: ${id}`,
    owner: `Owner`,
  };
}
