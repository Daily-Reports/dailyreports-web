import React, {useEffect, useState} from "react";
import Dialog from "@/components/ui/dialog/dialog.tsx";
import {IconEdit} from "@tabler/icons-react";
import {useErrorStore} from "@/stores/errorStore.tsx";
import {EmployeeType} from "@/types/employee.tsx";
import EmployeeTypeSelect from "@/features/employee/components/employee-type-select.tsx";
import {updateEmployeeInputSchema} from "@/features/employee/api/update-employee.tsx";
import {useEmployee} from "@/features/employee/api/fetch-employee.tsx";

type employeeEditDialogProps = {
    employeeId: number;
    open: boolean;
    setOpen: (open: boolean) => void;
    onEdit: (value: {
        type: EmployeeType
    }, options: { onSuccess: () => void }) => void;
}

const EmployeeEditDialog: React.FC<employeeEditDialogProps> = ({employeeId, open, setOpen, onEdit}) => {
    const {addErrors, clearErrors} = useErrorStore();

    const employeeQuery = useEmployee({id: employeeId});
    const [type, setType] = useState<EmployeeType | null>(null);

    useEffect(() => {
        if (!employeeQuery.data) return;

        setType(employeeQuery.data.type ?? null);
    }, [
        employeeQuery.data,
        open,
    ]);

    useEffect(() => {
        if (open)
            employeeQuery.refetch().catch((error) => {
                console.error("Error while trying to reload employee data.", error);
            });
    }, [open, employeeQuery]);

    const handleKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter')
            event.preventDefault();
    };

    const clearFormAndClose = () => {
        setType(null);

        clearErrors();
        setOpen(false);
    }

    return (
        <Dialog open={open} onClose={clearFormAndClose}>
            <div className="text-center w-56">
                <IconEdit size={56} className="mx-auto"/>
                <h3 className="text-lg font-black text-gray-800">Edit employee</h3>
                <p className="text-sm text-gray-500">Change employee details.</p>

                <form onKeyDown={handleKeyDown}>
                    <EmployeeTypeSelect selectValue={type} setSelectedValue={setType}/>
                </form>

                <div className="mt-5 flex gap-4">
                    <button type="button"
                            className="w-full py-2 bg-blue-500 rounded-lg text-white font-extrabold hover:bg-blue-700"
                            onClick={() => {
                                clearErrors();
                                const parsed = updateEmployeeInputSchema.safeParse({
                                    type
                                });

                                if (!parsed.success) {
                                    addErrors(parsed.error.errors.map(e => e.message));
                                    return;
                                }

                                onEdit(parsed.data, {
                                    onSuccess: () => {
                                        clearFormAndClose();
                                    }
                                });
                            }}
                    >
                        Submit
                    </button>

                    <button className="w-full py-2 shadow rounded-lg font-extrabold hover:bg-gray-200"
                            onClick={clearFormAndClose}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </Dialog>
    )
}

export default EmployeeEditDialog;