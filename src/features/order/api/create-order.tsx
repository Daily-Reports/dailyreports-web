import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import { api } from "@/lib/api-client";
import { MutationConfig } from "@/lib/react-query";
import { getOrdersQueryOptions } from "@/features/order/api/get-orders.tsx";
import { Order, OrderSpeciality } from "@/types/order.tsx";
import { useErrorStore } from "@/stores/errorStore.tsx";
import { AxiosError } from "axios";

export const createOrderInputSchema = z.object({
  orderNumber: z
    .number({
      required_error: "Number is required",
      invalid_type_error: "Number is required",
    })
    .refine(
      (val) => `${val}`.length === 10,
      "The order number must be 10 digits long",
    ),
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
  subareaId: z
    .number({
      invalid_type_error: "Invalid subarea id",
    })
    .optional(),
  speciality: z.nativeEnum(OrderSpeciality, {
    errorMap: () => {
      return { message: "Speciality is required" };
    },
  }),
});

export type CreateOrderInput = z.infer<typeof createOrderInputSchema>;

export const createOrder = ({
  data,
}: {
  data: CreateOrderInput;
}): Promise<Order> => {
  return api.post(`/orders`, data);
};

type UseCreateOrderOptions = {
  mutationConfig?: MutationConfig<typeof createOrder>;
};

export const useCreateOrder = ({
  mutationConfig,
}: UseCreateOrderOptions = {}) => {
  const queryClient = useQueryClient();
  const { onSuccess, onError, ...restConfig } = mutationConfig || {};
  const { addError } = useErrorStore();

  return useMutation({
    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: getOrdersQueryOptions().queryKey,
      });
      onSuccess?.(...args);
    },
    onError: (error, ...args) => {
      if (error instanceof AxiosError) addError(error?.response?.data);

      onError?.(error, ...args);
    },
    ...restConfig,
    mutationFn: createOrder,
  });
};
