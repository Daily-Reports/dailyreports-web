import React, { useEffect, useState } from "react";
import Dialog from "@/components/ui/dialog/dialog.tsx";
import { IconEdit } from "@tabler/icons-react";
import InputValue from "@/components/ui/form/input-value.tsx";
import EventSelect from "@/features/event/components/event-select.tsx";
import { useEvents } from "@/features/event/api/get-events.tsx";
import AreaSelect from "@/features/area/components/area-select.tsx";
import { useAreas } from "@/features/area/api/get-areas.tsx";
import SubareaSelect from "@/features/subarea/components/subarea-select.tsx";
import { useSubareas } from "@/features/subarea/api/get-subareas.tsx";
import OrderSpecialitySelect from "@/features/order/components/order-speciality-select.tsx";
import { Event } from "@/types/event.tsx";
import { Area } from "@/types/area.tsx";
import { Subarea } from "@/types/subarea.tsx";
import { OrderSpeciality } from "@/types/order.tsx";
import { useOrder } from "@/features/order/api/fetch-order.tsx";
import { useErrorStore } from "@/stores/errorStore.tsx";
import { useEvent } from "@/features/event/api/fetch-event.tsx";
import { useArea } from "@/features/area/api/fetch-area.tsx";
import { useSubarea } from "@/features/subarea/api/fetch-subarea.tsx";
import { updateOrderInputSchema } from "@/features/order/api/update-order.tsx";

type OrderEditDialogProps = {
  orderId: number;
  open: boolean;
  setOpen: (open: boolean) => void;
  onEdit: (
    data: {
      technical: string;
      description: string;
      eventId: number;
      areaId: number;
      subareaId?: number | undefined;
      speciality: OrderSpeciality;
    },
    options: { onSuccess: () => void },
  ) => void;
};

const OrderEditDialog: React.FC<OrderEditDialogProps> = ({
  orderId,
  open,
  setOpen,
  onEdit,
}) => {
  const { addErrors, clearErrors } = useErrorStore();

  const orderQuery = useOrder({ id: orderId });
  const eventQuery = useEvent({
    id: orderQuery.data?.eventId,
    queryConfig: { enabled: !!orderQuery.data?.eventId },
  });
  const areaQuery = useArea({
    id: orderQuery.data?.areaId,
    queryConfig: { enabled: !!orderQuery.data?.areaId },
  });
  const subareaQuery = useSubarea({
    id: orderQuery.data?.subareaId,
    queryConfig: { enabled: !!orderQuery.data?.subareaId },
  });

  const { data: events } = useEvents();
  const { data: areas } = useAreas();
  const { data: subareas } = useSubareas();

  const [technical, setTechnical] = useState("");
  const [description, setDescription] = useState("");
  const [event, setEvent] = useState<Event | null>(null);
  const [area, setArea] = useState<Area | null>(null);
  const [subarea, setSubarea] = useState<Subarea | null>(null);
  const [speciality, setSpeciality] = useState<OrderSpeciality | null>(null);

  useEffect(() => {
    if (!orderQuery.data) return;

    setTechnical(orderQuery.data.technical ?? "");
    setDescription(orderQuery.data.description ?? "");
    setSpeciality(orderQuery.data.speciality ?? null);
    setEvent(eventQuery.data ?? null);
    setArea(areaQuery.data ?? null);
    setSubarea(subareaQuery.data ?? null);
  }, [
    orderQuery.data,
    eventQuery.data,
    areaQuery.data,
    subareaQuery.data,
    open,
  ]);

  useEffect(() => {
    if (open)
      orderQuery.refetch().catch((error) => {
        console.error("Error while trying to reload order data.", error);
      });
  }, [open, orderQuery]);

  const clearFormAndClose = () => {
    setTechnical("");
    setDescription("");

    setEvent(null);
    setArea(null);
    setSubarea(null);

    setSpeciality(null);

    clearErrors();
    setOpen(false);
  };

  const handleSubmit = () => {
    clearErrors();

    const parsed = updateOrderInputSchema.safeParse({
      technical,
      description,
      eventId: event?.id,
      areaId: area?.id,
      subareaId: subarea?.id,
      speciality:
        speciality == null
          ? null
          : !isNaN(Number(speciality))
            ? speciality
            : OrderSpeciality[speciality],
    });

    if (!parsed.success) {
      addErrors(parsed.error.errors.map((e) => e.message));
      return;
    }

    onEdit(parsed.data, {
      onSuccess: () => clearFormAndClose(),
    });
  };

  return (
    <Dialog open={open} onClose={clearFormAndClose}>
      <div className="text-center w-112">
        <IconEdit size={56} className="mx-auto" />
        <h3 className="text-lg font-black text-gray-800">Edit order</h3>
        <p className="text-sm text-gray-500">Change order details.</p>

        <form
          className="mt-3"
          onKeyDown={(e) => e.key === "Enter" && e.preventDefault()}
        >
          <InputValue
            title="Technical"
            value={technical}
            setValue={setTechnical}
          />
          <InputValue
            title="Description"
            value={description}
            setValue={setDescription}
          />

          <EventSelect
            events={events ?? []}
            selectValue={event}
            setSelectedValue={setEvent}
          />

          <div className="flex justify-between">
            <AreaSelect
              areas={areas ?? []}
              selectValue={area}
              setSelectValue={setArea}
            />
            <SubareaSelect
              subareas={subareas ?? []}
              selectValue={subarea}
              setSelectedValue={setSubarea}
            />
          </div>

          <OrderSpecialitySelect
            selectValue={speciality}
            setSelectedValue={setSpeciality}
          />
        </form>

        <div className="mt-5 flex gap-4">
          <button
            type="button"
            className="w-full py-2 bg-blue-500 rounded-lg text-white font-extrabold hover:bg-blue-700 disabled:opacity-50"
            onClick={handleSubmit}
            disabled={orderQuery.isLoading}
          >
            Submit
          </button>

          <button
            type="button"
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

export default OrderEditDialog;
