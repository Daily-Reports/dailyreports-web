import { IconTrash } from "@tabler/icons-react";
import Dialog from "@/components/ui/dialog/dialog.tsx";
import React from "react";

type DeleteDialogProps = {
  title: string;
  subtitle: string;
  open: boolean;
  setOpen: (open: boolean) => void;
  onDelete: () => void;
};

const DeleteDialog: React.FC<DeleteDialogProps> = ({
  title,
  subtitle,
  open,
  setOpen,
  onDelete,
}) => {
  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <div className="text-center w-56">
        <IconTrash size={56} className="mx-auto text-red-500" />

        <div className="mx-auto my-4 w-48">
          <h3 className="text-lg font-black text-gray-800">{title}</h3>
          <p className="text-sm text-gray-500">{subtitle}</p>

          <div className="mt-4 flex gap-4">
            <button
              className="w-full py-2 bg-red-500 rounded-lg text-white font-extrabold hover:bg-red-700"
              onClick={() => {
                onDelete();
                setOpen(false);
              }}
            >
              Delete
            </button>

            <button
              className="w-full py-2 shadow rounded-lg font-extrabold hover:bg-gray-200"
              onClick={() => setOpen(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default DeleteDialog;
