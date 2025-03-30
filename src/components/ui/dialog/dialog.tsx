import React from "react";

interface DialogProps {
    open: boolean;
    onClose: () => void,
    children?: React.ReactNode,
}

const Dialog: React.FC<DialogProps> = ({open, onClose, children}) => {
    return (
            <div onClick={onClose}
                 className={`fixed inset-0 flex justify-center items-center transition-colors visible ${open ? "visible bg-gray-800/20" : "bg-transparent hidden"}`}>
                <div onClick={(e) => e.stopPropagation()}
                     className={`bg-white rounded-xl shadow p-6 transition-all ${open ? "scale-100 opacity-100" : "scale-125 opacity-0"}`}>
                    {children}
                </div>
            </div>
    );
}

export default Dialog;