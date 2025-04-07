import React from "react";
import { useArea } from "@/features/area/api/fetch-area.tsx";

type AreaNameProps = {
  areaId: number;
};

const AreaName: React.FC<AreaNameProps> = ({ areaId }) => {
  const areaQuery = useArea({ id: areaId });

  return <span>{areaQuery.data?.name ?? "Unknown Area"}</span>;
};

export default AreaName;
