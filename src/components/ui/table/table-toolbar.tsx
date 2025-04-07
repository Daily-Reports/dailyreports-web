import { Table } from "@tanstack/react-table";
import { IconPlus } from "@tabler/icons-react";

export type TableToolbarProps<T> = {
  table: Table<T>;
  placeholder: string;
  onCreateClick?: () => void;
};

export const TableToolbar = <T,>({
  table,
  placeholder,
  onCreateClick,
}: TableToolbarProps<T>) => {
  return (
    <div className="flex items-center mb-3">
      <div className="md:w-fit w-3/4 border-2 border-gray-200 rounded-md hover:bg-gray-50">
        <input
          className="placeholder-gray-500 p-2"
          onChange={(e) => table.setGlobalFilter(String(e.target.value))}
          placeholder={placeholder}
        />
      </div>
      <button
        className="ml-4 p-2 rounded-md border-2 border-gray-200 hover:bg-gray-50"
        onClick={onCreateClick && onCreateClick}
      >
        <IconPlus size={20} />
      </button>
    </div>
  );
};
