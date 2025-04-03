import React from "react";
import {useSubarea} from "@/features/subarea/api/fetch-subarea.tsx";

type SubareaNameProps = {
    subareaId: number;
}

const SubareaName: React.FC<SubareaNameProps>  = ({subareaId}) => {
    const subareaQuery = useSubarea({id: subareaId});

    return <span>{subareaQuery.data?.name ?? "Unknown Subarea"}</span>;
};

export default SubareaName;