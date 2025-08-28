"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { DeleteLogDialog } from "./delete-log-dialog";
import { EditLogDialog } from "./edit-log-dialog";
import { TLog } from "../_models/model";

interface LogsTableProps {
  logData: TLog[];
  onLogUpdated: (updatedLog: TLog) => void;
  onLogDeleted: (logId: number) => void;
}

export function LogsTable({
  logData,
  onLogUpdated,
  onLogDeleted,
}: LogsTableProps) {
  return (
    <div className="w-full">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px] sm:w-auto">Owner</TableHead>
            <TableHead className="hidden md:table-cell">Created At</TableHead>
            <TableHead className="hidden md:table-cell">Updated At</TableHead>
            <TableHead>Log Text</TableHead>
            <TableHead className="text-right w-[70px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {logData.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={5}
                className="h-32 text-center text-muted-foreground"
              >
                No logs available on this page.
              </TableCell>
            </TableRow>
          ) : (
            logData.map((log) => (
              <TableRow key={log.id} className="group">
                <TableCell className="font-medium">
                  <div className="truncate max-w-[150px] sm:max-w-none">
                    {log.owner}
                  </div>
                </TableCell>
                <TableCell className="hidden md:table-cell text-sm text-muted-foreground">
                  {new Intl.DateTimeFormat("en-GB", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  }).format(new Date(log.created_at))}
                </TableCell>
                <TableCell className="hidden md:table-cell text-sm text-muted-foreground">
                  {new Intl.DateTimeFormat("en-GB", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  }).format(new Date(log.updated_at))}
                </TableCell>
                <TableCell>
                  <div className="max-w-[200px] sm:max-w-[300px] lg:max-w-none">
                    <p className="truncate" title={log.log_text}>
                      {log.log_text}
                    </p>
                    <div className="md:hidden text-xs text-muted-foreground mt-1">
                      {new Intl.DateTimeFormat("en-GB").format(
                        new Date(log.created_at)
                      )}
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Open menu</span>
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent
                      className="w-32 p-2 flex flex-col gap-1"
                      align="end"
                    >
                      <EditLogDialog
                        logId={log.id}
                        onLogUpdated={onLogUpdated}
                      />
                      <DeleteLogDialog
                        logId={log.id}
                        onLogDeleted={onLogDeleted}
                      />
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
