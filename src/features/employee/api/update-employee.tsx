import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import { api } from "@/lib/api-client";
import { MutationConfig } from "@/lib/react-query";
import { Employee, EmployeeType } from "@/types/employee.tsx";
import { getEmployeesQueryOptions } from "@/features/employee/api/get-employees.tsx";
import { AxiosError } from "axios";
import { useErrorStore } from "@/stores/errorStore.tsx";

export const updateEmployeeInputSchema = z.object({
  type: z.nativeEnum(EmployeeType, {
    errorMap: () => {
      return { message: "Type is required" };
    },
  }),
});

export type UpdateEmployeeInput = z.infer<typeof updateEmployeeInputSchema>;

export const updateEmployee = ({
  data,
  employeeId,
}: {
  data: UpdateEmployeeInput;
  employeeId: number;
}): Promise<Employee> => {
  return api.patch(`/employees/${employeeId}`, data);
};

type useUpdateEmployeeOptions = {
  mutationConfig?: MutationConfig<typeof updateEmployee>;
};

export const useUpdateEmployee = ({
  mutationConfig,
}: useUpdateEmployeeOptions = {}) => {
  const queryClient = useQueryClient();
  const { onSuccess, onError, ...restConfig } = mutationConfig || {};
  const { addError } = useErrorStore();

  return useMutation({
    onSuccess: (data, ...args) => {
      queryClient.refetchQueries({
        queryKey: getEmployeesQueryOptions().queryKey,
      });
      onSuccess?.(data, ...args);
    },
    onError: (error, ...args) => {
      if (error instanceof AxiosError) addError(error?.response?.data);

      onError?.(error, ...args);
    },
    ...restConfig,
    mutationFn: updateEmployee,
  });
};
