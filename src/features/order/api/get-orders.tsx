import { queryOptions, useQuery } from "@tanstack/react-query";

import { api } from "@/lib/api-client";
import { QueryConfig } from "@/lib/react-query";
import { Order } from "@/types/order.tsx";

export const getOrders = (): Promise<Order[]> => {
  return api.get(`/orders`);
};

export const getOrdersQueryOptions = () => {
  return queryOptions({
    queryKey: ["orders"],
    queryFn: getOrders,
  });
};

type UseUsersOptions = {
  queryConfig?: QueryConfig<typeof getOrdersQueryOptions>;
};

export const useOrders = ({ queryConfig }: UseUsersOptions = {}) => {
  return useQuery({
    ...getOrdersQueryOptions(),
    ...queryConfig,
  });
};
