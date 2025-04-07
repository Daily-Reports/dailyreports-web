import { useMutation, useQueryClient } from "@tanstack/react-query";

import { api } from "@/lib/api-client";
import { MutationConfig } from "@/lib/react-query";
import { getEventsQueryOptions } from "./get-events";

export type DeleteEventDto = {
  id: number;
};

export const deleteEvent = ({ id }: DeleteEventDto) => {
  return api.delete(`/events/${id}`);
};

type UseDeleteEventOptions = {
  mutationConfig?: MutationConfig<typeof deleteEvent>;
};

export const useDeleteEvent = ({
  mutationConfig,
}: UseDeleteEventOptions = {}) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: async (...args) => {
      await queryClient.invalidateQueries({
        queryKey: getEventsQueryOptions().queryKey,
      });
      onSuccess?.(...args);
    },
    ...restConfig,
    mutationFn: deleteEvent,
  });
};
