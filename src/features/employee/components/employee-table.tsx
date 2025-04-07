import React, {useState} from "react";
import {Table} from "@/components/ui/table/table.tsx";
import {EmployeeColumns} from "@/features/employee/components/employee-columns.tsx";
import {useEmployees} from "@/features/employee/api/get-employees.tsx";
import {IconLoader} from "@tabler/icons-react";
import DeleteDialog from "@/components/ui/dialog/delete-dialog.tsx";
import {useDeleteEmployee} from "@/features/employee/api/delete-employee.tsx";
import EmployeeEditDialog from "@/features/employee/components/employee-edit-dialog.tsx";
import {useUpdateEmployee} from "@/features/employee/api/update-employee.tsx";
import EmployeeCreateDialog from "@/features/employee/components/employee-create-dialog.tsx";
import {useCreateEmployee} from "@/features/employee/api/create-employee.tsx";

const EmployeeTable: React.FC = () => {
    const [editOpen, setEditOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [createOpen, setCreateOpen] = useState(false);

    const [selectedId, setSelectedId] = useState<number | null>(null);

    const employeesQuery = useEmployees();

    const createEmployeeMutation = useCreateEmployee();
    const updateEmployeeMutation = useUpdateEmployee();
    const deleteEmployeeMutation = useDeleteEmployee();

    if (employeesQuery.isLoading)
        return (
            <div className="flex h-48 w-full justify-center">
                <IconLoader className="animate-spin" size={100}/>
            </div>
        );

    const employees = employeesQuery.data
    if (!employees) return null;

    return (
        <div className="flex flex-col mt-5">
            <Table
                columns={EmployeeColumns(
                    (id) => {
                        setEditOpen(true);
                        setSelectedId(id);
                    },
                    (id) => {
                        setDeleteOpen(true);
                        setSelectedId(id);
                    }
                )}
                data={employees}
                toolbarPlaceholder={"Filter employees..."}
                onCreateClick={() => setCreateOpen(true)}
            />

            {
                selectedId && (
                    <DeleteDialog title={"Confirm Delete"}
                                  subtitle={"Are you sure you want to delete this employee?"}
                                  open={deleteOpen}
                                  onDelete={() => {
                                      deleteEmployeeMutation.mutate({id: selectedId})
                                  }}
                                  setOpen={setDeleteOpen}/>
                )
            }

            {
                selectedId && (
                    <EmployeeEditDialog employeeId={selectedId}
                                        open={editOpen}
                                        onEdit={(data, options) => {
                                            updateEmployeeMutation.mutate({
                                                data,
                                                employeeId: selectedId
                                            }, {onSuccess: options.onSuccess})
                                        }}
                                        setOpen={setEditOpen}/>
                )
            }

            <EmployeeCreateDialog open={createOpen}
                                  onCreate={(data, options) => {
                                      createEmployeeMutation.mutate({data}, {onSuccess: options.onSuccess});
                                  }}
                                  setOpen={setCreateOpen}/>
        </div>
    )
}

export default EmployeeTable;