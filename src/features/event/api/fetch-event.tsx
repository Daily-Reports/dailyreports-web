import {queryOptions, useQuery} from '@tanstack/react-query';
import {api} from '@/lib/api-client';
import {QueryConfig} from "@/lib/react-query";
import {Event} from "@/types/event.tsx";

export type FetchEventDto = {
    id: number;
};

export const fetchEvent = async ({ id }: FetchEventDto): Promise<Event> => {
    return await api.get(`/events/${id}`)
};

export const fetchEventQueryOptions = (id: number) => {
    return queryOptions({
        queryKey: ['event', id],
        queryFn: () => fetchEvent({ id }),
    });
};

type UseEventOptions = {
    id: number;
    queryConfig?: QueryConfig<typeof fetchEventQueryOptions>;
};

export const useEvent = ({ id, queryConfig }: UseEventOptions) => {
    return useQuery({
        ...fetchEventQueryOptions(id),
        ...queryConfig,
    });
};
