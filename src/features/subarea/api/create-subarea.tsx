import {useMutation, useQueryClient} from '@tanstack/react-query';
import {z} from 'zod';
import {api} from '@/lib/api-client';
import {MutationConfig} from '@/lib/react-query';

import {getSubareasQueryOptions} from './get-subareas';
import {Subarea} from "@/types/subarea.tsx";

export const createSubareaInputSchema = z.object({
    name: z.string().min(1, 'Required'),
});

export type CreateSubareaInput = z.infer<typeof createSubareaInputSchema>;

export const createSubarea = ({
                                  data,
                              }: {
    data: CreateSubareaInput;
}): Promise<Subarea> => {
    return api.post(`/subareas`, data);
};

type UseCreateSubareaOptions = {
    mutationConfig?: MutationConfig<typeof createSubarea>;
};

export const useCreateSubarea = ({
                                     mutationConfig,
                                 }: UseCreateSubareaOptions = {}) => {
    const queryClient = useQueryClient();

    const {onSuccess, ...restConfig} = mutationConfig || {};

    return useMutation({
        onSuccess: (...args) => {
            queryClient.invalidateQueries({
                queryKey: getSubareasQueryOptions().queryKey,
            });
            onSuccess?.(...args);
        },
        ...restConfig,
        mutationFn: createSubarea,
    });
};