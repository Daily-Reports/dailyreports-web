import { useEvent } from "@/features/event/api/fetch-event.tsx";
import React from "react";

type EventNameProps = {
  eventId: number;
};

const EventName: React.FC<EventNameProps> = ({ eventId }) => {
  const eventQuery = useEvent({ id: eventId });

  return <span>{eventQuery.data?.name ?? "Unknown Event"}</span>;
};

export default EventName;
