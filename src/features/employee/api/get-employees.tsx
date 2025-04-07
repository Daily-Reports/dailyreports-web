import {queryOptions, useQuery} from '@tanstack/react-query';

import {api} from '@/lib/api-client';
import {QueryConfig} from "@/lib/react-query";
import {Employee} from "@/types/employee.tsx";

export const getEmployees = (): Promise<Employee[]> => {
    return api.get(`/employees`);
};

export const getEmployeesQueryOptions = () => {
    return queryOptions({
        queryKey: ['employees'],
        queryFn: getEmployees,
    });
};

type UseEmployeesOptions = {
    queryConfig?: QueryConfig<typeof getEmployeesQueryOptions>;
};

export const useEmployees = ({queryConfig}: UseEmployeesOptions = {}) => {
    return useQuery({
        ...getEmployeesQueryOptions(),
        ...queryConfig,
    });
};