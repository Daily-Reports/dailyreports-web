import React from "react";
import {useErrorStore} from "@/stores/errorStore.tsx";

interface DialogProps {
    open: boolean;
    onClose: () => void,
    children?: React.ReactNode,
}

const Dialog: React.FC<DialogProps> = ({open, onClose, children}) => {
    const { errors } = useErrorStore();

    return (
            <div onClick={onClose}
                 className={`fixed inset-0 flex justify-center items-center transition-colors visible ${open ? "visible bg-gray-800/20" : "bg-transparent hidden"}`}>
                <div onClick={(e) => e.stopPropagation()}
                     className={`bg-white rounded-xl shadow p-6 transition-all ${open ? "scale-100 opacity-100" : "scale-125 opacity-0"}`}>
                    {children}

                    {errors.length > 0 && (
                        <div className="mt-4 text-left text-red-600 space-y-1 text-sm">
                            {errors.map((error, index) => (
                                <div key={index}>• {error.message}</div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
    );
}

export default Dialog;