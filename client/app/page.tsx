import { AddLogDialog } from "./_components/add-log-dialog";
import { LogsTable } from "./_components/logs-table";

export default function Home() {
  const mockLogs = [
    {
      id: 1,
      log: "System rebooted",
      owner: "Alice",
      createdAt: new Date("2024-08-01"),
      updatedAt: new Date("2024-08-02"),
    },
    {
      id: 2,
      log: "Database migration",
      owner: "Bob",
      createdAt: new Date("2024-08-03"),
      updatedAt: new Date("2024-08-05"),
    },
    {
      id: 3,
      log: "API deployed",
      owner: "Charlie",
      createdAt: new Date("2024-08-06"),
      updatedAt: new Date("2024-08-06"),
    },
  ];

  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="flex items-center w-full gap-2 justify-between">
        <p className="text-lg font-medium text-grey-100">Log System App</p>
        <AddLogDialog />
      </div>
      <LogsTable logData={mockLogs} />
    </div>
  );
}
