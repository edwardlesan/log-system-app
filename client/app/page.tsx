import { AddLogDialog } from "./_components/add-log-dialog";

import LogsSection from "./_components/logs-section";

export default async function Home() {
  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="flex items-center w-full gap-2 justify-between">
        <p className="text-lg font-medium text-grey-100">Log System App</p>
        <AddLogDialog />
      </div>

      <LogsSection />
    </div>
  );
}
