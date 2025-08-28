import { Skeleton } from "@/components/ui/skeleton";

export function LoadingSkeleton() {
  const rows = 4;
  const columns = 5;

  return (
    <div className="flex flex-col gap-2 w-full rounded-md overflow-hidden">
      <div className="flex gap-4 px-4 py-2 bg-gray-200">
        {Array.from({ length: columns }).map((_, index) => (
          <Skeleton
            key={index}
            className="h-8 w-full rounded-md bg-gray-400/70"
          />
        ))}
      </div>

      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div
          key={rowIndex}
          className={`flex gap-4 px-4 py-2 ${
            rowIndex % 2 === 0 ? "bg-gray-100" : "bg-gray-50"
          }`}
        >
          {Array.from({ length: columns }).map((_, colIndex) => (
            <Skeleton
              key={colIndex}
              className="h-8 w-full rounded-md bg-gray-300/70"
            />
          ))}
        </div>
      ))}
    </div>
  );
}
