import React, {useState} from "react";
import {EventColumns} from './event-columns.tsx'
import {Table} from "@/components/ui/table/table.tsx";
import DeleteDialog from "@/components/ui/dialog/delete-dialog.tsx";
import EventCreateDialog from "./event-create-dialog.tsx";
import EventEditDialog from "./event-edit-dialog.tsx";
import {IconLoader} from "@tabler/icons-react";
import {useEvents} from "@/features/event/api/get-events.tsx";
import {useDeleteEvent} from "@/features/event/api/delete-event.tsx";
import {useUpdateEvent} from "@/features/event/api/update-event.tsx";
import {useCreateEvent} from "@/features/event/api/create-event.tsx";

const EventTable: React.FC = () => {
    const [editOpen, setEditOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [createOpen, setCreateOpen] = useState(false);
    const [selectedId, setSelectedId] = useState<number | null>(null);

    const eventsQuery = useEvents();
    const deleteEventMutation = useDeleteEvent();
    const updateEventMutation = useUpdateEvent();
    const createEventMutation = useCreateEvent();

    if (eventsQuery.isLoading)
        return (
            <div className="flex h-48 w-full justify-center">
                <IconLoader className="animate-spin" size={100}/>
            </div>
        );

    const events = eventsQuery.data
    if (!events) return null;

    return (
        <div className="flex flex-col mt-5">
            <Table
                    columns={EventColumns(
                            (id) => {
                                setEditOpen(true);
                                setSelectedId(id);
                            },
                            (id) => {
                                setDeleteOpen(true);
                                setSelectedId(id);
                            }
                    )}
                    data={events}
                    toolbarPlaceholder={"Filter events..."}
                    onCreateClick={() => setCreateOpen(true)}
            />

            <DeleteDialog title={"Confirm Delete"}
                          subtitle={"Are you sure you want to delete this event?"}
                          open={deleteOpen}
                          onDelete={async () => {
                              if (selectedId)
                                  deleteEventMutation.mutate({id: selectedId})
                          }}
                          setOpen={setDeleteOpen} />

            <EventEditDialog open={editOpen}
                               onEdit={async (name) => {
                                   if (selectedId !== null)
                                       updateEventMutation.mutate({
                                           data: {name},
                                           eventId: selectedId
                                       });
                               }}
                               setOpen={setEditOpen} />

            <EventCreateDialog open={createOpen}
                                 onCreate={async (name) => {
                                     createEventMutation.mutate({
                                         data: {name}
                                     });

                                     setCreateOpen(false)
                                 }}
                                 setOpen={setCreateOpen} />
        </div>
    )
}

export default EventTable;