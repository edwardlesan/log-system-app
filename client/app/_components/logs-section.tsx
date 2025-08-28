"use client";

import { useEffect, useState } from "react";
import { TLog } from "../_models/model";
import { fetchLogs } from "../_actions/actions";
import { LogsTable } from "./logs-table";
import { LoadingSkeleton } from "./loading-skeleton";
import ErrorPage from "./error-page";

export default function LogsSection() {
  const [logsData, setLogsData] = useState<TLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadLogs = async () => {
      try {
        const data = await fetchLogs();
        setLogsData(data);
      } catch (err: any) {
        const message =
          err?.response?.data?.message || err?.message || "Failed to load logs";
        setError(message);
      } finally {
        setLoading(false);
      }
    };

    loadLogs();
  }, []);

  if (loading) return <LoadingSkeleton />;
  if (error) return <ErrorPage message={error} />;
  return <LogsTable logData={logsData} />;
}
