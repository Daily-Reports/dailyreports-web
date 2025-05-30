import { Subarea } from "@/types/subarea.tsx";
import SelectValue from "@/components/ui/form/select-value.tsx";
import React from "react";

type SubareaSelectProps = {
  subareas: Subarea[];
  selectValue: Subarea | null;
  setSelectedValue: (value: Subarea | null) => void;
};

const SubareaSelect: React.FC<SubareaSelectProps> = ({
  subareas,
  selectValue,
  setSelectedValue,
}) => {
  const formattedSubareas: { value: Subarea | null; label: string }[] = [
    { value: null, label: "-" },
    ...subareas.map((subarea) => ({
      value: subarea,
      label: subarea.name,
    })),
  ];

  return (
    <div className="App">
      <SelectValue
        title={"Subarea"}
        placeholder={"Select a subarea..."}
        options={formattedSubareas}
        selectValue={selectValue}
        setSelectValue={setSelectedValue}
        compareFn={(a, b) => a.id === b.id}
      />
    </div>
  );
};

export default SubareaSelect;
