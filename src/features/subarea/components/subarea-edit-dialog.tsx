import React, {useState} from "react";
import Dialog from "@/components/ui/dialog/dialog.tsx";
import {IconEdit} from "@tabler/icons-react";

type SubareaEditDialogProps = {
    open: boolean;
    setOpen: (open: boolean) => void;
    onEdit: (input: string) => void;
}

const SubareaEditDialog: React.FC<SubareaEditDialogProps> = ({open, setOpen, onEdit}) => {
    const [name, setName] = useState('');

    return (
            <Dialog open={open} onClose={() => {
                setOpen(false)
                setName("")
            }}>
                <div className="text-center w-56">
                    <IconEdit size={56} className="mx-auto" />
                    <h3 className="text-lg font-black text-gray-800">Edit subarea</h3>
                    <p className="text-sm text-gray-500">Change subareas details.</p>

                    <form>
                        <h2 className={"text-lg text-gray-600 mt-5 text-left"}>Name</h2>

                        <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                className="w-full px-2 py-1 border border-gray-300 rounded-md text-lg focus:outline-none focus:ring-2 focus:ring-black"
                        />
                    </form>

                    <div className="mt-5 flex gap-4">
                        <button
                                className="w-full py-2 bg-blue-500 rounded-lg text-white font-extrabold hover:bg-blue-700"
                                onClick={() => {
                                    onEdit(name);
                                    setOpen(false);
                                    setName("")
                                }}
                        >
                            Submit
                        </button>

                        <button
                                className="w-full py-2 shadow rounded-lg font-extrabold hover:bg-gray-200"
                                onClick={() => {
                                    setOpen(false)
                                    setName("")
                                }}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </Dialog>
    )
}

export default SubareaEditDialog;