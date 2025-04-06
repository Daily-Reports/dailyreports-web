import React, {useState} from "react";
import Dialog from "@/components/ui/dialog/dialog.tsx";
import {IconDeviceFloppy} from "@tabler/icons-react";
import {useErrorStore} from "@/stores/errorStore.tsx";
import InputValue from "@/components/ui/form/input-value.tsx";
import {createAreaInputSchema} from "@/features/area/api/create-area.tsx";

type AreaCreateDialogProps = {
    open: boolean,
    setOpen: (open: boolean) => void,
    onCreate: (data: {name: string}) => void,
}

const AreaCreateDialog: React.FC<AreaCreateDialogProps> = ({open, setOpen, onCreate}) => {
    const {addErrors, clearErrors} = useErrorStore();
    const [name, setName] = useState('');

    const clearFormAndClose = () => {
        setName('');

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
                    <IconDeviceFloppy size={56} className="mx-auto" />
                    <h3 className="text-lg font-black text-gray-800">Create area</h3>
                    <p className="text-sm text-gray-500">Define area details.</p>

                    <form onKeyDown={handleKeyDown}>
                        <InputValue title={"Name"} value={name} setValue={setName}/>
                    </form>

                    <div className="mt-5 flex gap-4">
                        <button type="button"
                                className="w-full py-2 bg-green-500 rounded-lg text-white font-extrabold hover:bg-green-700"
                                onClick={() => {
                                    clearErrors();
                                    const parsed = createAreaInputSchema.safeParse({
                                        name
                                    });

                                    if (!parsed.success) {
                                        addErrors(parsed.error.errors.map(e => e.message));
                                        return;
                                    }

                                    clearFormAndClose();
                                    onCreate(parsed.data);
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

export default AreaCreateDialog;