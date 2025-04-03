import {queryOptions, useQuery} from '@tanstack/react-query';

import {api} from '@/lib/api-client';
import {QueryConfig} from "@/lib/react-query";
import {Subarea} from "@/types/subarea.tsx";

export const getSubareas = (): Promise<Subarea[]> => {
    return api.get(`/subareas`);
};

export const getSubareasQueryOptions = () => {
    return queryOptions({
        queryKey: ['subareas'],
        queryFn: getSubareas,
    });
};

type UseUsersOptions = {
    queryConfig?: QueryConfig<typeof getSubareasQueryOptions>;
};

export const useSubareas = ({queryConfig}: UseUsersOptions = {}) => {
    return useQuery({
        ...getSubareasQueryOptions(),
        ...queryConfig,
    });
};