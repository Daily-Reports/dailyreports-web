import SelectValue from "@/components/ui/form/select-value.tsx";
import React from "react";
import { Area } from "@/types/area.tsx";

type AreaSelectProps = {
  areas: Area[];
  selectValue: Area | null;
  setSelectValue: (value: Area | null) => void;
};

const AreaSelect: React.FC<AreaSelectProps> = ({
  areas,
  selectValue,
  setSelectValue,
}) => {
  const formattedAreas = areas.map((area) => ({
    value: area,
    label: area.name,
  }));

  return (
    <div className="App">
      <SelectValue
        title={"Area"}
        placeholder={"Select an area..."}
        options={formattedAreas}
        selectValue={selectValue}
        setSelectValue={setSelectValue}
        compareFn={(a, b) => a.id === b.id}
      />
    </div>
  );
};

export default AreaSelect;
