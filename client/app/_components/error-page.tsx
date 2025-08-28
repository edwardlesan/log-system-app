"use client";

import { AlertCircle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ErrorPageProps {
  message?: string;
  onRetry?: () => void;
}

export default function ErrorPage({
  message = "Something went wrong",
  onRetry,
}: ErrorPageProps) {
  const handleRetry = () => {
    if (onRetry) {
      onRetry();
    } else {
      window.location.reload();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
      <AlertCircle className="text-red-600 w-16 h-16" />

      <p className="text-red-600 text-lg font-medium text-center">{message}</p>

      <Button onClick={handleRetry}>
        <RefreshCw className="w-4 h-4 text-white" />
        Retry
      </Button>
    </div>
  );
}
