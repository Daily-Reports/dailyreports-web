import {useMutation, useQueryClient} from '@tanstack/react-query';

import {api} from '@/lib/api-client';
import {MutationConfig} from '@/lib/react-query';

import {getSubareasQueryOptions} from './get-subareas';

export type DeleteSubareaDto = {
    id: number;
};

export const deleteSubarea = ({id}: DeleteSubareaDto) => {
    return api.delete(`/subareas/${id}`);
};

type UseDeleteSubareaOptions = {
    mutationConfig?: MutationConfig<typeof deleteSubarea>;
};

export const useDeleteSubarea = ({mutationConfig,}: UseDeleteSubareaOptions = {}) => {
    const queryClient = useQueryClient();

    const {onSuccess, ...restConfig} = mutationConfig || {};

    return useMutation({
        onSuccess: async (...args) => {
            await queryClient.invalidateQueries({
                queryKey: getSubareasQueryOptions().queryKey,
            });
            onSuccess?.(...args);
        },
        ...restConfig,
        mutationFn: deleteSubarea,
    });
};