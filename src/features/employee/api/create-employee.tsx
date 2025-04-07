import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import { api } from "@/lib/api-client";
import { MutationConfig } from "@/lib/react-query";
import { Employee, EmployeeType } from "@/types/employee.tsx";
import { getEmployeesQueryOptions } from "@/features/employee/api/get-employees.tsx";
import { AxiosError } from "axios";
import { useErrorStore } from "@/stores/errorStore.tsx";

export const createEmployeeInputSchema = z.object({
  name: z.string().min(1, "Employee name is required"),
  type: z.nativeEnum(EmployeeType, {
    errorMap: () => {
      return { message: "Type is required" };
    },
  }),
});

export type CreateEmployeeInput = z.infer<typeof createEmployeeInputSchema>;

export const createEmployee = ({
  data,
}: {
  data: CreateEmployeeInput;
}): Promise<Employee> => {
  return api.post(`/employees`, data);
};

type UseCreateEmployeeOptions = {
  mutationConfig?: MutationConfig<typeof createEmployee>;
};

export const useCreateEmployee = ({
  mutationConfig,
}: UseCreateEmployeeOptions = {}) => {
  const queryClient = useQueryClient();
  const { onSuccess, onError, ...restConfig } = mutationConfig || {};
  const { addError } = useErrorStore();

  return useMutation({
    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: getEmployeesQueryOptions().queryKey,
      });
      onSuccess?.(...args);
    },
    onError: (error, ...args) => {
      if (error instanceof AxiosError) addError(error?.response?.data);

      onError?.(error, ...args);
    },
    ...restConfig,
    mutationFn: createEmployee,
  });
};
