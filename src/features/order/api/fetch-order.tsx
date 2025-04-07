import {queryOptions, useQuery} from '@tanstack/react-query';
import {api} from '@/lib/api-client';
import {QueryConfig} from "@/lib/react-query";
import {Order} from "@/types/order.tsx";

export type FetchOrderDto = {
    id: number;
};

export const fetchOrder = async ({id}: FetchOrderDto): Promise<Order> => {
    return await api.get(`/orders/${id}`)
};

export const fetchOrderQueryOptions = (id: number) => {
    return queryOptions({
        queryKey: ['order', id],
        queryFn: () => fetchOrder({id}),
    });
};

type UseOrderOptions = {
    id: number;
    queryConfig?: QueryConfig<typeof fetchOrderQueryOptions>;
};

export const useOrder = ({id, queryConfig}: UseOrderOptions) => {
    return useQuery({
        ...fetchOrderQueryOptions(id),
        ...queryConfig,
    });
};
