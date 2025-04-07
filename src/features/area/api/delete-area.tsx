import { useMutation, useQueryClient } from "@tanstack/react-query";

import { api } from "@/lib/api-client";
import { MutationConfig } from "@/lib/react-query";
import { getAreasQueryOptions } from "./get-areas";

export type DeleteAreaDto = {
  id: number;
};

export const deleteArea = ({ id }: DeleteAreaDto) => {
  return api.delete(`/areas/${id}`);
};

type UseDeleteAreaOptions = {
  mutationConfig?: MutationConfig<typeof deleteArea>;
};

export const useDeleteArea = ({
  mutationConfig,
}: UseDeleteAreaOptions = {}) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: async (...args) => {
      await queryClient.invalidateQueries({
        queryKey: getAreasQueryOptions().queryKey,
      });
      onSuccess?.(...args);
    },
    ...restConfig,
    mutationFn: deleteArea,
  });
};
