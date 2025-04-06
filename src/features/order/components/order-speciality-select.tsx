import SelectValue from "@/components/ui/form/select-value.tsx";
import React from "react";
import {OrderSpeciality} from "@/types/order.tsx";

type Props = {
    selectValue: OrderSpeciality | null;
    setSelectedValue: (value: OrderSpeciality | null) => void;
};

const OrderSpecialitySelect: React.FC<Props> = ({selectValue, setSelectedValue}) => {
    const formattedOrderSpecialities = Object.keys(OrderSpeciality)
        .filter((key) => isNaN(Number(key)))
        .map((key) => ({
            value: OrderSpeciality[key as keyof typeof OrderSpeciality],
            label: key,
        }));

    return (
        <div className="App">
            <SelectValue
                title={"Speciality"}
                placeholder={"Select a speciality..."}
                options={formattedOrderSpecialities}
                selectValue={selectValue}
                setSelectValue={setSelectedValue}
            />
        </div>
    );
};

export default OrderSpecialitySelect;