"use client";

import { useEffect, useState } from "react";
import { TLog } from "../_models/model";
import { fetchLogs } from "../_actions/actions";
import { LogsTable } from "./logs-table";
import { LoadingSkeleton } from "./loading-skeleton";
import ErrorPage from "./error-page";
import { AddLogDialog } from "./add-log-dialog";
import { Pagination } from "./pagination";
import { usePagination } from "../_utils/hooks/usePagination";
import { AxiosError } from "axios";

const ITEMS_PER_PAGE = 10;

export default function LogsSection() {
  const [logsData, setLogsData] = useState<TLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const {
    currentPage,
    totalPages,
    totalItems,
    itemsPerPage,
    paginatedData,
    goToPage,
    resetPagination,
  } = usePagination({
    data: logsData,
    itemsPerPage: ITEMS_PER_PAGE,
  });

  useEffect(() => {
    const loadLogs = async () => {
      try {
        const data = await fetchLogs();
        setLogsData(data);
      } catch (err) {
        let message = "Failed to load logs";
        if (err instanceof AxiosError) {
          message = err.response?.data?.message ?? err.message;
        } else if (err instanceof Error) {
          message = err.message;
        }
        setError(message);
      } finally {
        setLoading(false);
      }
    };

    loadLogs();
  }, []);

  const handleLogAdded = (newLog: TLog) => {
    setLogsData((prev) => {
      const newData = [...prev, newLog];
      if (paginatedData.length >= itemsPerPage) {
        const newTotalPages = Math.ceil(newData.length / itemsPerPage);
        goToPage(newTotalPages);
      }
      return newData;
    });
  };

  const handleLogUpdated = (updatedLog: TLog) => {
    setLogsData((prev) =>
      prev.map((log) => (log.id === updatedLog.id ? updatedLog : log))
    );
  };

  const handleLogDeleted = (logId: number) => {
    setLogsData((prev) => {
      const newData = prev.filter((log) => log.id !== logId);
      const newTotalPages = Math.ceil(newData.length / itemsPerPage);
      if (currentPage > newTotalPages && newTotalPages > 0) {
        goToPage(newTotalPages);
      }
      return newData;
    });
  };

  const refreshLogs = async () => {
    setLoading(true);
    setError(null);
    resetPagination();
    try {
      const data = await fetchLogs();
      setLogsData(data);
    } catch (err) {
      let message = "Failed to load logs";
      if (err instanceof AxiosError) {
        message = err.response?.data?.message ?? err.message;
      } else if (err instanceof Error) {
        message = err.message;
      }
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSkeleton />;
  if (error) return <ErrorPage message={error} onRetry={refreshLogs} />;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Logs</h1>
          {totalItems > 0 && (
            <p className="text-sm text-muted-foreground">
              Manage your system logs
            </p>
          )}
        </div>
        <AddLogDialog onLogAdded={handleLogAdded} />
      </div>

      <div className="border rounded-lg">
        <LogsTable
          logData={paginatedData}
          onLogUpdated={handleLogUpdated}
          onLogDeleted={handleLogDeleted}
        />

        {totalItems > ITEMS_PER_PAGE && (
          <div className="border-t px-6 py-4">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              totalItems={totalItems}
              itemsPerPage={itemsPerPage}
              onPageChange={goToPage}
            />
          </div>
        )}
      </div>
    </div>
  );
}
