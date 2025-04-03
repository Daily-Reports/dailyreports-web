import {ColumnDef} from "@tanstack/react-table";
import {IconCalendar, IconId, IconList, IconMap, IconPencil, IconTool, IconUser, IconX} from "@tabler/icons-react";
import {Order} from "@/types/order.tsx";
import EventName from "@/features/event/components/event-name.tsx";
import AreaName from "@/features/area/components/area-name.tsx";
import SubareaName from "@/features/subarea/components/subarea-name.tsx";


export const OrderColumns = (handleEdit: (id: number) => void, handleDelete: (id: number) => void): ColumnDef<Order>[] => {
    return [
        {
            accessorKey: "orderNumber",
            cell: (info) => info.getValue(),
            header: () => (
                <span className="flex items-center">
                    <IconId className="mr-2" size={16}/> NUMBER
                </span>
            ),
            enableGlobalFilter: false,
        },
        {
            accessorKey: "description",
            cell: (info) => info.getValue(),
            header: () => (
                <span className="flex items-center">
                    <IconList className="mr-2" size={16}/> description
                </span>
            ),
        },
        {
            accessorKey: "eventId",
            cell: (info) => <EventName eventId={info.getValue() as number} />,
            header: () => (
                <span className="flex items-center">
                    <IconCalendar className="mr-2" size={16}/> event
                </span>
            ),
        },
        {
            accessorKey: "areaId",
            cell: (info) => <AreaName areaId={info.getValue() as number} />,
            header: () => (
                <span className="flex items-center">
                    <IconMap className="mr-2" size={16}/> area
                </span>
            ),
        },
        {
            accessorKey: "subareaId",
            cell: (info) => <SubareaName subareaId={info.getValue() as number} />,
            header: () => (
                <span className="flex items-center">
                    <IconMap className="mr-2" size={16}/> subarea
                </span>
            ),
        },
        {
            accessorKey: "speciality",
            cell: (info) => {
                return info.getValue();
            },
            header: () => (
                <span className="flex items-center">
                    <IconTool className="mr-2" size={16}/> speciality
                </span>
            ),
        },
        {
            accessorKey: "technical",
            cell: (info) => {
                return info.getValue();
            },
            header: () => (
                <span className="flex items-center">
                    <IconUser className="mr-2" size={16}/> technical
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