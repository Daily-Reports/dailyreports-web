import {queryOptions, useQuery} from '@tanstack/react-query';
import {api} from '@/lib/api-client';
import {QueryConfig} from "@/lib/react-query";
import {Area} from "@/types/area.tsx";

export type FetchAreaDto = {
    id: number;
};

export const fetchArea = async ({ id }: FetchAreaDto): Promise<Area> => {
    return await api.get(`/areas/${id}`)
};

export const fetchAreaQueryOptions = (id: number) => {
    return queryOptions({
        queryKey: ['area', id],
        queryFn: () => fetchArea({ id }),
    });
};

type UseAreaOptions = {
    id: number;
    queryConfig?: QueryConfig<typeof fetchAreaQueryOptions>;
};

export const useArea = ({ id, queryConfig }: UseAreaOptions) => {
    return useQuery({
        ...fetchAreaQueryOptions(id),
        ...queryConfig,
    });
};
