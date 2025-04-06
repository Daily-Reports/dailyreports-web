import React, {useState} from "react";
import {AreaColumns} from './area-columns.tsx'
import {Table} from "@/components/ui/table/table.tsx";
import DeleteDialog from "@/components/ui/dialog/delete-dialog.tsx";
import AreaCreateDialog from "./area-create-dialog.tsx";
import AreaEditDialog from "./area-edit-dialog.tsx";
import {IconLoader} from "@tabler/icons-react";

import {useUpdateArea} from "@/features/area/api/update-area.tsx";
import {useCreateArea} from "@/features/area/api/create-area.tsx";
import {useAreas} from "@/features/area/api/get-areas.tsx";
import {useDeleteArea} from "@/features/area/api/delete-area.tsx";

const AreaTable: React.FC = () => {
    const [editOpen, setEditOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [createOpen, setCreateOpen] = useState(false);

    const [selectedId, setSelectedId] = useState<number | null>(null);

    const areasQuery = useAreas();
    const deleteAreaMutation = useDeleteArea();
    const updateAreaMutation = useUpdateArea();
    const createAreaMutation = useCreateArea();

    if (areasQuery.isLoading)
        return (
            <div className="flex h-48 w-full justify-center">
                <IconLoader className="animate-spin" size={100}/>
            </div>
        );

    const areas = areasQuery.data
    if (!areas) return null;

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
                              if (selectedId)
                                  deleteAreaMutation.mutate({id: selectedId})
                          }}
                          setOpen={setDeleteOpen} />

            <AreaEditDialog open={editOpen}
                            onEdit={(data) => {
                                if (selectedId !== null)
                                    updateAreaMutation.mutate({data,
                                        areaId: selectedId
                                    });
                            }}
                               setOpen={setEditOpen} />

            <AreaCreateDialog open={createOpen}
                              onCreate={(data) => {
                                  createAreaMutation.mutate({data});
                                  setCreateOpen(false)
                              }}
                              setOpen={setCreateOpen} />
        </div>
    )
}

export default AreaTable;