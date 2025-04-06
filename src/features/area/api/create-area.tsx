import {useMutation, useQueryClient} from '@tanstack/react-query';
import {z} from 'zod';
import {api} from '@/lib/api-client';
import {MutationConfig} from '@/lib/react-query';
import {getAreasQueryOptions} from "./get-areas";
import {Area} from "@/types/area.tsx";

export const createAreaInputSchema = z.object({
    name: z.string().min(1, 'Area name is required'),
});

export type CreateAreaInput = z.infer<typeof createAreaInputSchema>;

export const createArea = ({
                               data,
                           }: {
    data: CreateAreaInput;
}): Promise<Area> => {
    return api.post(`/areas`, data);
};

type UseCreateAreaOptions = {
    mutationConfig?: MutationConfig<typeof createArea>;
};

export const useCreateArea = ({
                                  mutationConfig,
                              }: UseCreateAreaOptions = {}) => {
    const queryClient = useQueryClient();

    const {onSuccess, ...restConfig} = mutationConfig || {};

    return useMutation({
        onSuccess: (...args) => {
            queryClient.invalidateQueries({
                queryKey: getAreasQueryOptions().queryKey,
            });
            onSuccess?.(...args);
        },
        ...restConfig,
        mutationFn: createArea,
    });
};