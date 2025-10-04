"use client";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Fragment } from "react";
import { InView } from "react-intersection-observer";

import type { ColumnDef } from "@tanstack/react-table";
import { Skeleton } from "@/lib/ui/skeleton";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/lib/ui/table/Table";
export interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];

  onMobileRender: (row: TData) => React.ReactNode;
  onLoadMore?: () => void;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  onMobileRender,
  onLoadMore,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="h-full w-full overflow-hidden rounded-xl pb-16 lg:border lg:pb-0">
      <Table className="overflow-hidden rounded-xl">
        <TableHeader className="hidden lg:table-header-group">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead
                    key={header.id}
                    style={{ width: `${header.getSize()}px` }}
                    className="text-secondary-foreground"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>

        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row, index) => {
              if (index === table.getRowModel().rows.length - 7 && onLoadMore) {
                return (
                  <InView
                    as="tr"
                    key={row.id}
                    onChange={(inView) => {
                      if (inView) {
                        onLoadMore();
                      }
                    }}
                    data-state={row.getIsSelected() && "selected"}
                    className="transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted lg:border-b"
                  >
                    {row.getVisibleCells().map((cell, index) => (
                      <Fragment key={`tableCell/${index}/${cell.id}`}>
                        <TableCell
                          className="hidden text-black lg:table-cell"
                          style={{ width: `${cell.column.getSize()}px` }}
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>

                        {index === 0 && (
                          <TableCell className="px-0 lg:hidden">
                            {onMobileRender(cell.getContext().row.original)}
                          </TableCell>
                        )}
                      </Fragment>
                    ))}
                  </InView>
                );
              }
              return (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell, index) => (
                    <Fragment key={`tableCell/${index}/${cell.id}`}>
                      <TableCell
                        className="hidden text-muted-foreground lg:table-cell"
                        style={{ width: `${cell.column.getSize()}px` }}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>

                      {index === 0 && (
                        <TableCell className="px-0 lg:hidden">
                          {onMobileRender(cell.getContext().row.original)}
                        </TableCell>
                      )}
                    </Fragment>
                  ))}
                </TableRow>
              );
            })
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                Sem resultados.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}

interface DataTableSkeletonProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  rows: number;
  onMobileRender: () => React.ReactNode;
}

export function DataTableSkeleton<TData, TValue>({
  columns,
  rows,
  onMobileRender,
}: DataTableSkeletonProps<TData, TValue>) {
  return (
    <div className="h-full w-full overflow-hidden rounded-sm lg:border">
      <Table>
        <TableHeader className="hidden lg:table-header-group">
          <TableRow>
            {columns.map((column, index) => (
              <TableHead
                key={`tableHead/${index}/${column.id}`}
                style={{ width: `${column.size}px` }}
              >
                <Skeleton className="h-4 w-24 bg-secondary" />
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>

        <TableBody>
          {Array.from({ length: rows }, (_, index) => (
            <TableRow key={index} data-state="loading">
              {columns.map((column, index) => (
                <Fragment key={`tableCell/${index}/${column.id}`}>
                  <TableCell
                    className="hidden bg-background lg:table-cell"
                    style={{ width: `${column.size}px` }}
                  >
                    <Skeleton className="h-4 w-24 bg-secondary" />
                  </TableCell>

                  {index === 0 && (
                    <TableCell className="lg:hidden">
                      {onMobileRender()}
                    </TableCell>
                  )}
                </Fragment>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
