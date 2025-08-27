import { object, string, infer as zodInfer } from "zod";

export const LogFormSchema = object({
  log: string().min(2, { message: "Log must be at least 2 characters." }),
  owner: string().min(2, { message: "Owner must be at least 2 characters." }),
});

export type LogFormData = zodInfer<typeof LogFormSchema>;

export const defaultLogFormValues: LogFormData = {
  log: "",
  owner: "",
};

// MOCK REQUEST
export async function fetchLogById(id: number): Promise<LogFormData> {
  await new Promise((resolve) => setTimeout(resolve, 500));

  return {
    log: `Sample log entry for ID: ${id}`,
    owner: `Owner`,
  };
}
