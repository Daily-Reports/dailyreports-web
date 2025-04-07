import { useMutation, useQueryClient } from "@tanstack/react-query";

import { api } from "@/lib/api-client";
import { MutationConfig } from "@/lib/react-query";
import { getEmployeesQueryOptions } from "@/features/employee/api/get-employees.tsx";

export type DeleteEmployeeDto = {
  id: number;
};

export const deleteEmployee = ({ id }: DeleteEmployeeDto) => {
  return api.delete(`/employees/${id}`);
};

type UseDeleteEmployeeOptions = {
  mutationConfig?: MutationConfig<typeof deleteEmployee>;
};

export const useDeleteEmployee = ({
  mutationConfig,
}: UseDeleteEmployeeOptions = {}) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: async (...args) => {
      await queryClient.invalidateQueries({
        queryKey: getEmployeesQueryOptions().queryKey,
      });
      onSuccess?.(...args);
    },
    ...restConfig,
    mutationFn: deleteEmployee,
  });
};
