import React, {useState} from "react";
import Dialog from "@/components/ui/dialog/dialog.tsx";
import {IconDeviceFloppy} from "@tabler/icons-react";
import {useErrorStore} from "@/stores/errorStore.tsx";
import {EmployeeType} from "@/types/employee.tsx";
import EmployeeTypeSelect from "@/features/employee/components/employee-type-select.tsx";
import {createEmployeeInputSchema} from "@/features/employee/api/create-employee.tsx";
import InputValue from "@/components/ui/form/input-value.tsx";

type EmployeeCreateDialogProps = {
    open: boolean,
    setOpen: (open: boolean) => void,
    onCreate: (data: {
        name: string,
        type: EmployeeType
    }, options: { onSuccess: () => void }) => void,
}

const EmployeeCreateDialog: React.FC<EmployeeCreateDialogProps> = ({open, setOpen, onCreate}) => {
    const {addErrors, clearErrors} = useErrorStore();

    const [name, setName] = useState('');
    const [type, setType] = useState<EmployeeType | null>(null);

    const clearFormAndClose = () => {
        setName('')
        setType(null)

        clearErrors();
        setOpen(false);
    }

    const handleKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter')
            event.preventDefault();
    };

    return (
        <Dialog open={open} onClose={clearFormAndClose}>
            <div className="text-center w-56">
                <IconDeviceFloppy size={56} className="mx-auto"/>
                <h3 className="text-lg font-black text-gray-800">Create employee</h3>
                <p className="text-sm text-gray-500">Define employee details.</p>

                <form onKeyDown={handleKeyDown}>
                    <InputValue title={"Name"} value={name} setValue={setName}/>
                    <EmployeeTypeSelect selectValue={type} setSelectedValue={setType}/>
                </form>

                <div className="mt-5 flex gap-4">
                    <button type="button"
                            className="w-full py-2 bg-green-500 rounded-lg text-white font-extrabold hover:bg-green-700"
                            onClick={() => {
                                clearErrors();
                                const parsed = createEmployeeInputSchema.safeParse({
                                    name,
                                    type
                                });

                                if (!parsed.success) {
                                    addErrors(parsed.error.errors.map(e => e.message));
                                    return;
                                }

                                onCreate(parsed.data, {
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

export default EmployeeCreateDialog;