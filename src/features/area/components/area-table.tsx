import React, {useEffect, useState} from "react";
import {AreaColumns} from './area-columns.tsx'
import {Table} from "@/components/ui/table/table.tsx";
import DeleteDialog from "@/components/ui/dialog/delete-dialog.tsx";
import {useAreaStore} from "@/stores/areaStore.tsx";
import AreaCreateDialog from "@/features/area/components/area-create-dialog.tsx";
import AreaEditDialog from "@/features/area/components/area-edit-dialog.tsx";

const AreaTable: React.FC = () => {
    const {areas, fetchAreas, editArea, createArea, removeArea} = useAreaStore();

    const [editOpen, setEditOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [createOpen, setCreateOpen] = useState(false);

    const [selectedId, setSelectedId] = useState<number | null>(null);

    useEffect(() => {
        fetchAreas().catch((error) => {
            console.error(error)
            throw new Error("Areas cannot be loaded");
        })
    }, [fetchAreas]);

    return (
        <div className="flex flex-col mt-5">
            <Table
                    columns={AreaColumns(
                            (id) => {
                                setEditOpen(true);
                                setSelectedId(id);
                            },
                            (id) => {
                                setDeleteOpen(true);
                                setSelectedId(id);
                            }
                    )}
                    data={areas}
                    toolbarPlaceholder={"Filter areas..."}
                    onCreateClick={() => setCreateOpen(true)}
            />

            <DeleteDialog title={"Confirm Delete"}
                          subtitle={"Are you sure you want to delete this area?"}
                          open={deleteOpen}
                          onDelete={async () => {
                              if (selectedId !== null)
                                  await removeArea(selectedId);
                          }}
                          setOpen={setDeleteOpen} />

            <AreaEditDialog open={editOpen}
                               onEdit={async (name) => {
                                   if (selectedId !== null)
                                       await editArea(selectedId, name);
                               }}
                               setOpen={setEditOpen} />

            <AreaCreateDialog open={createOpen}
                                 onCreate={async (name) => {
                                     await createArea(name)
                                     await fetchAreas();

                                     setCreateOpen(false)
                                 }}
                                 setOpen={setCreateOpen} />
        </div>
    )
}

export default AreaTable;