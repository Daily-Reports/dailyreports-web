import { useMutation, useQueryClient } from "@tanstack/react-query";

import { api } from "@/lib/api-client";
import { MutationConfig } from "@/lib/react-query";
import { getOrdersQueryOptions } from "@/features/order/api/get-orders.tsx";

export type DeleteOrderDto = {
  id: number;
};

export const deleteOrder = ({ id }: DeleteOrderDto) => {
  return api.delete(`/orders/${id}`);
};

type UseDeleteOrderOptions = {
  mutationConfig?: MutationConfig<typeof deleteOrder>;
};

export const useDeleteOrder = ({
  mutationConfig,
}: UseDeleteOrderOptions = {}) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: async (...args) => {
      await queryClient.invalidateQueries({
        queryKey: getOrdersQueryOptions().queryKey,
      });
      onSuccess?.(...args);
    },
    ...restConfig,
    mutationFn: deleteOrder,
  });
};
