import {useSubareaStore} from "@/stores/subareaStore.tsx";
import React, {useEffect, useState} from "react";
import {columns} from './subarea-columns.tsx'
import {Table} from "@/components/ui/table/table.tsx";
import DeleteDialog from "@/components/ui/dialog/delete-dialog.tsx";
import SubareaEditDialog from "@/features/subarea/components/subarea-edit-dialog.tsx";

const SubareaTable: React.FC = () => {
    const {subareas, fetchSubareas, editSubarea, removeSubarea} = useSubareaStore();

    const [editOpen, setEditOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);

    const [selectedId, setSelectedId] = useState<number | null>(null);

    useEffect(() => {
        fetchSubareas().catch((error) => {
            console.error(error)
            throw new Error("Subareas cannot be loaded");
        })
    }, [fetchSubareas])

    return (
        <div className="flex flex-col mt-5">
            <Table
                    columns={columns(
                            (id) => {
                                setEditOpen(true);
                                setSelectedId(id);
                            },
                            (id) => {
                                setDeleteOpen(true);
                                setSelectedId(id);
                            }
                    )}
                    data={subareas}
                    toolbarPlaceholder={"Filter subareas..."}
            />

            <DeleteDialog title={"Confirm Delete"}
                          subtitle={"Are you sure you want to delete this subarea?"}
                          open={deleteOpen}
                          onDelete={() => {
                              if(selectedId !== null)
                                  removeSubarea(selectedId);
                          }}
                          setOpen={setDeleteOpen} />

            <SubareaEditDialog open={editOpen}
                               onEdit={(name) => {
                                   if(selectedId !== null)
                                       editSubarea(selectedId, name);
                               }}
                               setOpen={setEditOpen}/>
        </div>
    )
}

export default SubareaTable;