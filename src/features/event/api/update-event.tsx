import {useMutation, useQueryClient} from '@tanstack/react-query';
import {z} from 'zod';
import {api} from '@/lib/api-client';
import {MutationConfig} from '@/lib/react-query';
import {getEventsQueryOptions} from "./get-events";
import {Event} from "@/types/event.tsx";

export const updateEventInputSchema = z.object({
    name: z.string().min(1, 'Required'),
});

export type UpdateEventInput = z.infer<typeof updateEventInputSchema>;

export const updateEvent = ({data, eventId}: {
    data: UpdateEventInput;
    eventId: number;
}): Promise<Event> => {
    return api.patch(`/events/${eventId}`, data);
};

type useUpdateEventOptions = {
    mutationConfig?: MutationConfig<typeof updateEvent>;
};

export const useUpdateEvent = ({mutationConfig,}: useUpdateEventOptions = {}) => {
    const queryClient = useQueryClient();

    const {onSuccess, ...restConfig} = mutationConfig || {};

    return useMutation({
        onSuccess: (data, ...args) => {
            queryClient.refetchQueries({
                queryKey: getEventsQueryOptions().queryKey,
            });
            onSuccess?.(data, ...args);
        },
        ...restConfig,
        mutationFn: updateEvent,
    });
};