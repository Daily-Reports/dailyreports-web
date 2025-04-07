import {queryOptions, useQuery} from '@tanstack/react-query';
import {api} from '@/lib/api-client';
import {QueryConfig} from "@/lib/react-query";
import {Subarea} from "@/types/subarea.tsx";

export type FetchSubareaDto = {
    id: number;
};

export const fetchSubarea = async ({ id }: FetchSubareaDto): Promise<Subarea> => {
    return await api.get(`/subareas/${id}`)
};

export const fetchSubareaQueryOptions = (id: number | undefined) => {
    return queryOptions({
        queryKey: ['subarea', id],
        queryFn: () => fetchSubarea({id} as FetchSubareaDto),
    });
};

type UseSubareaOptions = {
    id: number | undefined;
    queryConfig?: QueryConfig<typeof fetchSubareaQueryOptions>;
};

export const useSubarea = ({id, queryConfig}: UseSubareaOptions) => {
    return useQuery({
        ...fetchSubareaQueryOptions(id),
        ...queryConfig,
        enabled: id !== undefined && (queryConfig?.enabled ?? true),
    });
};
