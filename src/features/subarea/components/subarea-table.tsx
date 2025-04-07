import React, { useState } from "react";
import { Table } from "@/components/ui/table/table.tsx";
import { SubareaColumns } from "./subarea-columns.tsx";
import { useSubareas } from "@/features/subarea/api/get-subareas.tsx";
import { IconLoader } from "@tabler/icons-react";
import DeleteDialog from "@/components/ui/dialog/delete-dialog.tsx";
import { useDeleteSubarea } from "@/features/subarea/api/delete-subarea.tsx";
import SubareaEditDialog from "./subarea-edit-dialog.tsx";
import { useUpdateSubarea } from "@/features/subarea/api/update-subarea.tsx";
import SubareaCreateDialog from "./subarea-create-dialog.tsx";
import { useCreateSubarea } from "@/features/subarea/api/create-subarea.tsx";

const SubareaTable: React.FC = () => {
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [createOpen, setCreateOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const subareasQuery = useSubareas();
  const deleteSubareaMutation = useDeleteSubarea();
  const updateSubareaMutation = useUpdateSubarea();
  const createSubareaMutation = useCreateSubarea();

  if (subareasQuery.isLoading)
    return (
      <div className="flex h-48 w-full justify-center">
        <IconLoader className="animate-spin" size={100} />
      </div>
    );

  const subareas = subareasQuery.data;
  if (!subareas) return null;

  return (
    <div className="flex flex-col mt-5">
      <Table
        columns={SubareaColumns(
          (id) => {
            setEditOpen(true);
            setSelectedId(id);
          },
          (id) => {
            setDeleteOpen(true);
            setSelectedId(id);
          },
        )}
        data={subareas}
        toolbarPlaceholder={"Filter subareas..."}
        onCreateClick={() => setCreateOpen(true)}
      />

      <DeleteDialog
        title={"Confirm Delete"}
        subtitle={"Are you sure you want to delete this order?"}
        open={deleteOpen}
        onDelete={() => {
          if (selectedId) deleteSubareaMutation.mutate({ id: selectedId });
        }}
        setOpen={setDeleteOpen}
      />

      <SubareaEditDialog
        open={editOpen}
        onEdit={(data) => {
          if (selectedId !== null)
            updateSubareaMutation.mutate({ data, subareaId: selectedId });
        }}
        setOpen={setEditOpen}
      />

      <SubareaCreateDialog
        open={createOpen}
        onCreate={(data) => {
          createSubareaMutation.mutate({ data });
          setCreateOpen(false);
        }}
        setOpen={setCreateOpen}
      />
    </div>
  );
};

export default SubareaTable;
