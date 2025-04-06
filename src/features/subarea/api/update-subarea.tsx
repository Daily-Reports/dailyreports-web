import {useMutation, useQueryClient} from '@tanstack/react-query';
import {z} from 'zod';
import {api} from '@/lib/api-client';
import {MutationConfig} from '@/lib/react-query';
import {getSubareasQueryOptions} from './get-subareas';
import {Subarea} from "@/types/subarea.tsx";

export const updateSubareaInputSchema = z.object({
    name: z.string().min(1, 'New subarea name is required'),
});

export type UpdateSubareaInput = z.infer<typeof updateSubareaInputSchema>;

export const updateSubarea = ({data, subareaId}: {
    data: UpdateSubareaInput;
    subareaId: number;
}): Promise<Subarea> => {
    return api.patch(`/subareas/${subareaId}`, data);
};

type useUpdateSubareaOptions = {
    mutationConfig?: MutationConfig<typeof updateSubarea>;
};

export const useUpdateSubarea = ({mutationConfig,}: useUpdateSubareaOptions = {}) => {
    const queryClient = useQueryClient();

    const {onSuccess, ...restConfig} = mutationConfig || {};

    return useMutation({
        onSuccess: (data, ...args) => {
            queryClient.refetchQueries({
                queryKey: getSubareasQueryOptions().queryKey,
            });
            onSuccess?.(data, ...args);
        },
        ...restConfig,
        mutationFn: updateSubarea,
    });
};