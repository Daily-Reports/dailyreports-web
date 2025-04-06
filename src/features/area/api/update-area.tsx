import {useMutation, useQueryClient} from '@tanstack/react-query';
import {z} from 'zod';
import {api} from '@/lib/api-client';
import {MutationConfig} from '@/lib/react-query';
import {getAreasQueryOptions} from "./get-areas.tsx";
import {Area} from "@/types/area.tsx";

export const updateAreaInputSchema = z.object({
    name: z.string().min(1, 'New area name is required'),
});

export type UpdateAreaInput = z.infer<typeof updateAreaInputSchema>;

export const updateArea = ({data, areaId}: {
    data: UpdateAreaInput;
    areaId: number;
}): Promise<Area> => {
    return api.patch(`/areas/${areaId}`, data);
};

type useUpdateAreaOptions = {
    mutationConfig?: MutationConfig<typeof updateArea>;
};

export const useUpdateArea = ({mutationConfig,}: useUpdateAreaOptions = {}) => {
    const queryClient = useQueryClient();

    const {onSuccess, ...restConfig} = mutationConfig || {};

    return useMutation({
        onSuccess: (data, ...args) => {
            queryClient.refetchQueries({
                queryKey: getAreasQueryOptions().queryKey,
            });
            onSuccess?.(data, ...args);
        },
        ...restConfig,
        mutationFn: updateArea,
    });
};