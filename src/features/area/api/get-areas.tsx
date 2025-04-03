import {queryOptions, useQuery} from '@tanstack/react-query';

import {api} from '@/lib/api-client';
import {QueryConfig} from "@/lib/react-query";
import {Area} from "@/types/area.tsx";

export const getAreas = (): Promise<Area[]> => {
    return api.get(`/areas`);
};

export const getAreasQueryOptions = () => {
    return queryOptions({
        queryKey: ['areas'],
        queryFn: getAreas,
    });
};

type UseUsersOptions = {
    queryConfig?: QueryConfig<typeof getAreasQueryOptions>;
};

export const useAreas = ({queryConfig}: UseUsersOptions = {}) => {
    return useQuery({
        ...getAreasQueryOptions(),
        ...queryConfig,
    });
};