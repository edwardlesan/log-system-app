import LogsSection from "./_components/logs-section";

export default async function Home() {
  return (
    <div className="flex flex-col gap-6 w-full">
      <LogsSection />
    </div>
  );
}
