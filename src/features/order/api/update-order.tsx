import {useMutation, useQueryClient} from '@tanstack/react-query';
import {z} from 'zod';
import {api} from '@/lib/api-client';
import {MutationConfig} from '@/lib/react-query';
import {getOrdersQueryOptions} from "@/features/order/api/get-orders.tsx";
import {Order, OrderSpeciality} from "@/types/order.tsx";
import {AxiosError} from "axios";
import {useErrorStore} from "@/stores/errorStore.tsx";

export const updateOrderInputSchema = z.object({
    technical: z.string().min(1, "Technical name is required"),
    description: z.string().min(1, "Description is required"),

    eventId: z.number({
        required_error: "Event is required",
        invalid_type_error: "invalid event id",
    }),
    areaId: z.number({
        required_error: "Area is required",
        invalid_type_error: "Invalid area id",
    }),
    subareaId: z.number({
        invalid_type_error: "Invalid subarea id",
    }).optional(),
    speciality: z.nativeEnum(OrderSpeciality, {
        errorMap: () => {
            return {message: 'Speciality is required'};
        }
    }),
});

export type UpdateOrderInput = z.infer<typeof updateOrderInputSchema>;

export const updateOrder = ({data, orderId}: {
    data: UpdateOrderInput;
    orderId: number;
}): Promise<Order> => {
    return api.patch(`/orders/${orderId}`, data);
};

type useUpdateOrderOptions = {
    mutationConfig?: MutationConfig<typeof updateOrder>;
};

export const useUpdateOrder = ({mutationConfig,}: useUpdateOrderOptions = {}) => {
    const queryClient = useQueryClient();
    const {onSuccess, onError, ...restConfig} = mutationConfig || {};
    const {addError} = useErrorStore();

    return useMutation({
        onSuccess: (data, ...args) => {
            queryClient.refetchQueries({
                queryKey: getOrdersQueryOptions().queryKey,
            });
            onSuccess?.(data, ...args);
        },
        onError: (error, ...args) => {
            if (error instanceof AxiosError)
                addError(error?.response?.data)

            onError?.(error, ...args);
        },
        ...restConfig,
        mutationFn: updateOrder,
    });
};