"use client";

import { useRouter } from "next/navigation";
import { AlertCircle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ErrorPage({ message = "Something went wrong" }) {
  const router = useRouter();

  const handleRefresh = () => {
    router.refresh();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
      <AlertCircle className="text-red-600 w-16 h-16" />

      <p className="text-red-600 text-lg font-medium text-center">{message}</p>

      <Button onClick={handleRefresh}>
        <RefreshCw className="w-4 h-4 text-white" />
        Refresh
      </Button>
    </div>
  );
}
