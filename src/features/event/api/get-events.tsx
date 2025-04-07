import { queryOptions, useQuery } from "@tanstack/react-query";

import { api } from "@/lib/api-client";
import { QueryConfig } from "@/lib/react-query";
import { Event } from "@/types/event.tsx";

export const getEvents = (): Promise<Event[]> => {
  return api.get(`/events`);
};

export const getEventsQueryOptions = () => {
  return queryOptions({
    queryKey: ["events"],
    queryFn: getEvents,
  });
};

type UseUsersOptions = {
  queryConfig?: QueryConfig<typeof getEventsQueryOptions>;
};

export const useEvents = ({ queryConfig }: UseUsersOptions = {}) => {
  return useQuery({
    ...getEventsQueryOptions(),
    ...queryConfig,
  });
};
