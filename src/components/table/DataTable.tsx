import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    useReactTable
} from "@tanstack/react-table";
import {IconChevronLeft, IconChevronRight, IconId, IconPencil, IconUserCircle, IconX} from "@tabler/icons-react";
import {useSubareaStore} from "../../stores/subareaStore.tsx";
import {useEffect} from "react";
import {Subarea} from "../../type/Subarea.tsx";

const columnHelper = createColumnHelper<Subarea>();

const columns = [
    columnHelper.accessor("id", {
        cell: (info) => info.getValue(),
        header: () => (
            <span className="flex items-center">
                <IconId className="mr-2" size={16} /> ID
            </span>
        )
    }),
    columnHelper.accessor("name", {
        cell: (info) => info.getValue(),
        header: () => (
            <span className="flex items-center">
                <IconUserCircle className="mr-2" size={16} /> Name
            </span>
        )
    }),
    {
        id: 'actions',
        header: () => (
            <span className="flex items-center">
                Actions
            </span>
        ),
        cell: () => (
            <div>
                <span className="flex items-center justify-between">
                    <IconPencil className="rounded-full hover:bg-gray-200" size={20} onClick={() => console.log("Edit clicked")}/>
                    <IconX className="rounded-full hover:bg-gray-200 text-red-500" size={20} onClick={() => console.log("Remove clicked")}/>
                </span>
            </div>
        ),
    },
];

export default function DataTable() {
    const {subareas, fetchSubareas} = useSubareaStore();

    useEffect(() => {
        fetchSubareas()
    }, [fetchSubareas])

    const table = useReactTable({
        data: subareas,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        initialState: {
            pagination: {
                pageIndex: 0,
                pageSize: 10,
            },
        }
    })

    return (
        <div className="flex flex-col mt-5">
            <div className="shadow-md">
                <table className="min-w-full">
                    <thead className="bg-gray-100">
                    {
                        table.getHeaderGroups().map((group) => (
                            <tr key={group.id}>
                                {
                                    group.headers.map((header) => (
                                        <th key={header.id}
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            <div>
                                                {
                                                    flexRender(
                                                        header.column.columnDef.header,
                                                        header.getContext()
                                                    )
                                                }
                                            </div>
                                        </th>
                                    ))
                                }
                            </tr>
                        ))
                    }
                    </thead>

                    <tbody className="bg-white divide-y divide-gray-200">
                    {
                        table.getRowModel().rows.map((row) => (
                            <tr key={row.id} className="hover:bg-gray-50">
                                {
                                    row.getVisibleCells().map((cell) => (
                                        <td key={cell.id}
                                            className="px-6 py-3 whitespace-nowrap text-sm text-gray-500">
                                            {
                                                flexRender(cell.column.columnDef.cell, cell.getContext())
                                            }
                                        </td>
                                    ))
                                }
                            </tr>
                        ))
                    }
                    </tbody>
                </table>
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-center mt-4 text-sm text-gray-700">
                <button
                    className="p-2 rounded-md bg-gray-100 text-gray-600 hover:bg-gray-200 disabled:opacity-50"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                >
                    <IconChevronLeft/>
                </button>

                <button
                    className="p-2 rounded-md bg-gray-100 text-gray-600 hover:bg-gray-200 disabled:opacity-50"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                >
                    <IconChevronRight/>
                </button>
            </div>
        </div>
    )
}