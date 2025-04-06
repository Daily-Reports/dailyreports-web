import React, {useState} from "react";
import {Table} from "@/components/ui/table/table.tsx";
import DeleteDialog from "@/components/ui/dialog/delete-dialog.tsx";
import OrderEditDialog from "@/features/order/components/order-edit-dialog.tsx";
import OrderCreateDialog from "@/features/order/components/order-create-dialog.tsx";
import {OrderColumns} from "@/features/order/components/order-columns.tsx";
import {IconLoader} from "@tabler/icons-react";
import {useOrders} from "@/features/order/api/get-orders.tsx";
import {useDeleteOrder} from "@/features/order/api/delete-order.tsx";
import {useCreateOrder} from "@/features/order/api/create-order.tsx";

const OrderTable: React.FC = () => {
    const ordersQuery = useOrders();
    const deleteOrderMutation = useDeleteOrder();
    const createOrderMutation = useCreateOrder();

    const [editOpen, setEditOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [createOpen, setCreateOpen] = useState(false);

    const [selectedId, setSelectedId] = useState<number | null>(null);

    if (ordersQuery.isLoading)
        return (
            <div className="flex h-48 w-full justify-center">
                <IconLoader className="animate-spin" size={100}/>
            </div>
        );

    const orders = ordersQuery.data
    if (!orders) return null;

    return (
        <div className="flex flex-col mt-5">
            <Table
                columns={OrderColumns(
                    (id) => {
                        setEditOpen(true);
                        setSelectedId(id);
                    },
                    (id) => {
                        setDeleteOpen(true);
                        setSelectedId(id);
                    }
                )}
                data={orders}
                toolbarPlaceholder={"Filter orders..."}
                onCreateClick={() => setCreateOpen(true)}
            />

            <DeleteDialog title={"Confirm Delete"}
                          subtitle={"Are you sure you want to delete this order?"}
                          open={deleteOpen}
                          onDelete={async () => {
                              if (selectedId !== null)
                                  deleteOrderMutation.mutate({id: selectedId});
                          }}
                          setOpen={setDeleteOpen}/>

            {/* will work soon */}
            <OrderEditDialog open={editOpen}
                             onEdit={() => {}}
                             setOpen={setEditOpen}/>

            <OrderCreateDialog open={createOpen}
                               setOpen={setCreateOpen}
                               onCreate={(data, options) => {
                                   createOrderMutation.mutate({data}, {
                                       onSuccess: options.onSuccess,
                                   });
                               }}/>
        </div>
    )
}

export default OrderTable;