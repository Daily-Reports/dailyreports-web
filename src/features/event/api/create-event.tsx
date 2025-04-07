import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import { api } from "@/lib/api-client";
import { MutationConfig } from "@/lib/react-query";
import { getEventsQueryOptions } from "./get-events";
import { Event } from "@/types/event.tsx";
import { AxiosError } from "axios";
import { useErrorStore } from "@/stores/errorStore.tsx";

export const createEventInputSchema = z.object({
  name: z.string().min(1, "Event name is required"),
});

export type CreateEventInput = z.infer<typeof createEventInputSchema>;

export const createEvent = ({
  data,
}: {
  data: CreateEventInput;
}): Promise<Event> => {
  return api.post(`/events`, data);
};

type UseCreateEventOptions = {
  mutationConfig?: MutationConfig<typeof createEvent>;
};

export const useCreateEvent = ({
  mutationConfig,
}: UseCreateEventOptions = {}) => {
  const queryClient = useQueryClient();
  const { onSuccess, onError, ...restConfig } = mutationConfig || {};
  const { addError } = useErrorStore();

  return useMutation({
    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: getEventsQueryOptions().queryKey,
      });
      onSuccess?.(...args);
    },
    onError: (error, ...args) => {
      if (error instanceof AxiosError) addError(error?.response?.data);

      onError?.(error, ...args);
    },
    ...restConfig,
    mutationFn: createEvent,
  });
};
