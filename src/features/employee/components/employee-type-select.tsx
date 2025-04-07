import SelectValue from "@/components/ui/form/select-value.tsx";
import React from "react";
import {EmployeeType} from "@/types/employee.tsx";

type Props = {
    selectValue: EmployeeType | null;
    setSelectedValue: (value: EmployeeType | null) => void;
};

const EmployeeTypeSelect: React.FC<Props> = ({selectValue, setSelectedValue}) => {
    const formattedEmployeeTypes = Object.keys(EmployeeType)
        .filter((key) => isNaN(Number(key)))
        .map((key) => ({
            value: EmployeeType[key as keyof typeof EmployeeType],
            label: key,
        }));

    return (
        <div className="App">
            <SelectValue
                title={"Type"}
                placeholder={"Select a type..."}
                options={formattedEmployeeTypes}
                selectValue={selectValue}
                setSelectValue={setSelectedValue}
                compareFn={(a, b) => {
                    const aValue = EmployeeType[a]?.toString();
                    const bValue = typeof b === "string" ? b : EmployeeType[b]?.toString();

                    return aValue === bValue;
                }}
            />
        </div>
    );
};

export default EmployeeTypeSelect;