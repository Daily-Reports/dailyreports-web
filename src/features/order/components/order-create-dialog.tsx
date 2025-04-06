import React, {useState} from "react";
import Dialog from "@/components/ui/dialog/dialog.tsx";
import {IconDeviceFloppy} from "@tabler/icons-react";
import {useSubareas} from "@/features/subarea/api/get-subareas.tsx";
import SubareaSelect from "@/features/subarea/components/subarea-select.tsx";
import AreaSelect from "@/features/area/components/area-select.tsx";
import {useAreas} from "@/features/area/api/get-areas.tsx";
import EventSelect from "@/features/event/components/event-select.tsx";
import {useEvents} from "@/features/event/api/get-events.tsx";
import InputValue from "@/components/ui/form/input-value.tsx";
import OrderSpecialitySelect from "@/features/order/components/order-speciality-select.tsx";
import {OrderSpeciality} from "@/types/order.tsx";
import {Event} from "@/types/event.tsx";
import {Area} from "@/types/area.tsx";
import {Subarea} from "@/types/subarea.tsx";
import {createOrderInputSchema} from "@/features/order/api/create-order.tsx";
import {useErrorStore} from "@/stores/errorStore.tsx";

type OrderCreateDialogProps = {
    open: boolean,
    setOpen: (open: boolean) => void,
    onCreate: (
        data: {
            orderNumber: number;
            technical: string;
            description: string;
            eventId: number;
            areaId: number;
            subareaId: number;
            speciality: OrderSpeciality;
        }
    ) => void;
}

const OrderCreateDialog: React.FC<OrderCreateDialogProps> = ({open, setOpen, onCreate}) => {
    const { addErrors, clearErrors } = useErrorStore();

    const [orderNumber, setOrderNumber] = useState('');
    const [technical, setTechnical] = useState('');
    const [description, setDescription] = useState('');

    const [event, setEvent] = useState<Event | null>(null);
    const [area, setArea] = useState<Area | null>(null);
    const [subarea, setSubarea] = useState<Subarea | null>(null);

    const [speciality, setSpeciality] = useState<OrderSpeciality | null>(null);

    const clearFormAndClose = () => {
        setOrderNumber('');
        setTechnical('');
        setDescription('');

        setEvent(null);
        setArea(null);
        setSubarea(null);
        setSpeciality(null);

        clearErrors();
        setOpen(false);
    }

    const handleKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter')
            event.preventDefault();
    };

    return (
        <Dialog open={open}
                onClose={clearFormAndClose}>
            <div className="text-center w-112">
                <IconDeviceFloppy size={56} className="mx-auto£"/>

                <h3 className="text-lg font-black text-gray-800">Create order</h3>
                <p className="text-sm text-gray-500">Define order details.</p>

                <form className={"mt-3"} onKeyDown={handleKeyDown}>
                    <div className={"flex gap-4"}>
                        <InputValue title={"Number"}
                                    value={orderNumber}
                                    setValue={setOrderNumber}
                                    type={"number"}/>
                        <InputValue title={"Technical"}
                                    value={technical}
                                    setValue={setTechnical}/>
                    </div>

                    <InputValue title={"Description"}
                                value={description}
                                setValue={setDescription}/>
                    <EventSelect events={useEvents().data ?? []}
                                 selectValue={event}
                                 setSelectedValue={setEvent}/>

                    <div className="flex justify-between">
                        <AreaSelect areas={useAreas().data ?? []}
                                    selectValue={area}
                                    setSelectValue={setArea}/>
                        <SubareaSelect subareas={useSubareas().data ?? []}
                                       selectValue={subarea}
                                       setSelectedValue={setSubarea}/>
                    </div>

                    <OrderSpecialitySelect
                        selectValue={speciality}
                        setSelectedValue={setSpeciality}/>
                </form>

                <div className="mt-5 flex gap-4">
                    <button
                        type="button"
                        className="w-full py-2 bg-green-500 rounded-lg text-white font-extrabold hover:bg-green-700"
                        onClick={() => { clearErrors();
                            const parsed = createOrderInputSchema.safeParse({
                                orderNumber: Number(orderNumber),
                                technical,
                                description,
                                eventId: event?.id,
                                areaId: area?.id,
                                subareaId: subarea?.id,
                                speciality: speciality,
                            });

                            if (!parsed.success) {
                                addErrors(parsed.error.errors.map(e => e.message));

                                return;
                            }

                            onCreate(parsed.data);
                        }}>
                        Submit
                    </button>

                    <button
                        className="w-full py-2 shadow rounded-lg font-extrabold hover:bg-gray-200"
                        onClick={() => clearFormAndClose()}>
                        Cancel
                    </button>
                </div>
            </div>
        </Dialog>
    )
}

export default OrderCreateDialog;