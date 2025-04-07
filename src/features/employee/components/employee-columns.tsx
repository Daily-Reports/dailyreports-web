import { ColumnDef } from "@tanstack/react-table";
import { IconId, IconList, IconPencil, IconX } from "@tabler/icons-react";
import { Employee } from "@/types/employee.tsx";

export const EmployeeColumns = (
  handleEdit: (id: number) => void,
  handleDelete: (id: number) => void,
): ColumnDef<Employee>[] => {
  return [
    {
      accessorKey: "id",
      cell: (info) => info.getValue(),
      header: () => (
        <span className="flex items-center">
          <IconId className="mr-2" size={16} /> ID
        </span>
      ),
      enableGlobalFilter: false,
    },
    {
      accessorKey: "name",
      cell: (info) => info.getValue(),
      header: () => (
        <span className="flex items-center">
          <IconList className="mr-2" size={16} /> Name
        </span>
      ),
    },
    {
      accessorKey: "type",
      cell: (info) => info.getValue(),
      header: () => (
        <span className="flex items-center">
          <IconList className="mr-2" size={16} /> Type
        </span>
      ),
    },
    {
      id: "actions",
      header: () => <span className="flex items-center">Actions</span>,
      cell: (info) => {
        return (
          <div>
            <span className="flex items-center justify-between">
              <IconPencil
                className="rounded-full hover:bg-gray-200 cursor-pointer"
                onClick={() => handleEdit(info.row.original.id)}
                size={20}
              />
              <IconX
                className="rounded-full hover:bg-gray-200 text-red-500 cursor-pointer"
                onClick={() => handleDelete(info.row.original.id)}
                size={20}
              />
            </span>
          </div>
        );
      },
    },
  ];
};
