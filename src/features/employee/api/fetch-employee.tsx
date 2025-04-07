import {queryOptions, useQuery} from '@tanstack/react-query';
import {api} from '@/lib/api-client';
import {QueryConfig} from "@/lib/react-query";
import {Employee} from "@/types/employee.tsx";

export type FetchEmployeeDto = {
    id: number;
};

export const fetchEmployee = async ({id}: FetchEmployeeDto): Promise<Employee> => {
    return await api.get(`/employees/${id}`)
};

export const fetchEmployeeQueryOptions = (id: number | undefined) => {
    return queryOptions({
        queryKey: ['employee', id],
        queryFn: () => fetchEmployee({id} as FetchEmployeeDto),
    });
};

type UseEmployeeOptions = {
    id: number | undefined;
    queryConfig?: QueryConfig<typeof fetchEmployeeQueryOptions>;
};

export const useEmployee = ({id, queryConfig}: UseEmployeeOptions) => {
    return useQuery({
        ...fetchEmployeeQueryOptions(id),
        ...queryConfig,
        enabled: id !== undefined && (queryConfig?.enabled ?? true),
    });
};
