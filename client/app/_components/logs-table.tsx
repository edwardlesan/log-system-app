"use client";

import {
  Table,
  TableBody,
  TableCaption,
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

export type Log = {
  id: number;
  log: string;
  owner: string;
  createdAt: Date;
  updatedAt: Date;
};

interface LogsTableProps {
  logData: Log[];
}

export function LogsTable({ logData }: LogsTableProps) {
  return (
    <Table>
      <TableCaption>A list of your recent logs.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Log Text</TableHead>
          <TableHead>Owner</TableHead>
          <TableHead>Created At</TableHead>
          <TableHead>Updated At</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {logData.length === 0 ? (
          <TableRow>
            <TableCell
              colSpan={5}
              className="text-center text-muted-foreground"
            >
              No logs available.
            </TableCell>
          </TableRow>
        ) : (
          logData.map((item, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">{item.log}</TableCell>
              <TableCell>{item.owner}</TableCell>
              <TableCell>
                {new Intl.DateTimeFormat("en-GB").format(item.createdAt)}
              </TableCell>
              <TableCell>
                {new Intl.DateTimeFormat("en-GB").format(item.updatedAt)}
              </TableCell>
              <TableCell className="text-right">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-28 p-2 flex flex-col gap-2">
                    <EditLogDialog logId={item.id} />
                    <DeleteLogDialog logId={item.id} />
                  </PopoverContent>
                </Popover>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
}
