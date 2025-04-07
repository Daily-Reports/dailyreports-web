import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import { Table } from "@tanstack/react-table";

export type TablePaginationProps<T> = {
  table: Table<T>;
};

export const TablePagination = <T,>({ table }: TablePaginationProps<T>) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-center mt-4 text-sm text-gray-700">
      <button
        className="p-2 rounded-md bg-gray-100 text-gray-600 hover:bg-gray-200 disabled:opacity-40"
        onClick={() => table.previousPage()}
        disabled={!table.getCanPreviousPage()}
      >
        <IconChevronLeft />
      </button>

      <button
        className="p-2 rounded-md bg-gray-100 text-gray-600 hover:bg-gray-200 disabled:opacity-40"
        onClick={() => table.nextPage()}
        disabled={!table.getCanNextPage()}
      >
        <IconChevronRight />
      </button>
    </div>
  );
};
