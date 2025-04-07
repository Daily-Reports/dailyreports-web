import React, { useState } from "react";
import Dialog from "@/components/ui/dialog/dialog.tsx";
import { IconEdit } from "@tabler/icons-react";
import { useErrorStore } from "@/stores/errorStore.tsx";
import { updateEventInputSchema } from "@/features/event/api/update-event.tsx";
import InputValue from "@/components/ui/form/input-value.tsx";

type EventEditDialogProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  onEdit: (data: { name: string }) => void;
};

const EventEditDialog: React.FC<EventEditDialogProps> = ({
  open,
  setOpen,
  onEdit,
}) => {
  const { addErrors, clearErrors } = useErrorStore();
  const [name, setName] = useState("");

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") event.preventDefault();
  };

  const clearFormAndClose = () => {
    setName("");

    clearErrors();
    setOpen(false);
  };

  return (
    <Dialog open={open} onClose={clearFormAndClose}>
      <div className="text-center w-56">
        <IconEdit size={56} className="mx-auto" />
        <h3 className="text-lg font-black text-gray-800">Edit event</h3>
        <p className="text-sm text-gray-500">Change event details.</p>

        <form onKeyDown={handleKeyDown}>
          <InputValue title={"Name"} value={name} setValue={setName} />
        </form>

        <div className="mt-5 flex gap-4">
          <button
            type="button"
            className="w-full py-2 bg-blue-500 rounded-lg text-white font-extrabold hover:bg-blue-700"
            onClick={() => {
              clearErrors();
              const parsed = updateEventInputSchema.safeParse({
                name,
              });

              if (!parsed.success) {
                addErrors(parsed.error.errors.map((e) => e.message));
                return;
              }

              clearFormAndClose();
              onEdit(parsed.data);
            }}
          >
            Submit
          </button>

          <button
            className="w-full py-2 shadow rounded-lg font-extrabold hover:bg-gray-200"
            onClick={clearFormAndClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </Dialog>
  );
};

export default EventEditDialog;
