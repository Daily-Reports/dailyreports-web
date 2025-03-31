import React from "react";
import {TablePagination} from "@/components/ui/table/table-pagination.tsx";
import {TableToolbar} from "@/components/ui/table/table-toolbar.tsx";
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    useReactTable
} from "@tanstack/react-table";

export const TableElement = React.forwardRef<
    HTMLTableElement,
    React.HTMLAttributes<HTMLTableElement>
>(({...props}, ref) => (
    <div className='shadow-md'>
        <table
            ref={ref}
            className={"min-w-full"}
            {...props}
        />
    </div>
))

export const TableHeader = React.forwardRef<
    HTMLTableSectionElement,
    React.HTMLAttributes<HTMLTableSectionElement>
>(({...props}, ref) => (
    <thead ref={ref} className={"bg-gray-100"} {...props} />
))

export const TableRow = React.forwardRef<
    HTMLTableRowElement,
    React.HTMLAttributes<HTMLTableRowElement>
>(({...props}, ref) => (
    <tr
        ref={ref}
        className="hover:bg-gray-50"
        {...props}
    />
))

export const TableHead = React.forwardRef<
    HTMLTableCellElement,
    React.HTMLAttributes<HTMLTableCellElement>
>(({...props}, ref) => (
    <th ref={ref}
        className={"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"} {...props} />
))

export const TableBody = React.forwardRef<
    HTMLTableSectionElement,
    React.HTMLAttributes<HTMLTableSectionElement>
>(({...props}, ref) => (
    <tbody ref={ref} className={"bg-white divide-y divide-gray-200"} {...props} />
))

export const TableCell = React.forwardRef<
    HTMLTableCellElement,
    React.HTMLAttributes<HTMLTableCellElement>
>(({...props}, ref) => (
    <td ref={ref} className={"px-6 py-3 whitespace-nowrap text-sm text-gray-500"} {...props} />
))

export type TableProps<T> = {
    data: T[];
    columns: ColumnDef<T>[];
    showToolbar?: boolean;
    toolbarPlaceholder?: string;
    showPagination?: boolean;
};

export const Table = <T, >({
                               data,
                               columns,
                               showToolbar = true,
                               toolbarPlaceholder = "Filter values...",
                               showPagination = true,
                           }: TableProps<T>) => {
    const table = useReactTable({
        data: data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        initialState: {
            pagination: {
                pageIndex: 0,
                pageSize: 10,
            },
        },
    })

    return (
        <div>
            {showToolbar && <TableToolbar table={table} placeholder={toolbarPlaceholder} />}

            <TableElement>
                <TableHeader>
                    {
                        table.getHeaderGroups().map((group) => (
                            <TableRow key={group.id}>
                                {
                                    group.headers.map((header) => (
                                        <TableHead key={header.id}>
                                            <div>
                                                {
                                                    flexRender(
                                                        header.column.columnDef.header,
                                                        header.getContext()
                                                    )
                                                }
                                            </div>
                                        </TableHead>
                                    ))
                                }
                            </TableRow>
                        ))
                    }
                </TableHeader>

                <TableBody>
                    {
                        table.getRowModel().rows.map((row) => (
                            <TableRow key={row.id}>
                                {
                                    row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {
                                                flexRender(cell.column.columnDef.cell, cell.getContext())
                                            }
                                        </TableCell>
                                    ))
                                }
                            </TableRow>
                        ))
                    }
                </TableBody>
            </TableElement>

            {showPagination && <TablePagination table={table} />}
        </div>
    )
}