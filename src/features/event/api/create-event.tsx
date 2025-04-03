import {useMutation, useQueryClient} from '@tanstack/react-query';
import {z} from 'zod';
import {api} from '@/lib/api-client';
import {MutationConfig} from '@/lib/react-query';
import {getEventsQueryOptions} from "./get-events";
import {Event} from "@/types/event.tsx";

export const createEventInputSchema = z.object({
    name: z.string().min(1, 'Required'),
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

    const {onSuccess, ...restConfig} = mutationConfig || {};

    return useMutation({
        onSuccess: (...args) => {
            queryClient.invalidateQueries({
                queryKey: getEventsQueryOptions().queryKey,
            });
            onSuccess?.(...args);
        },
        ...restConfig,
        mutationFn: createEvent,
    });
};