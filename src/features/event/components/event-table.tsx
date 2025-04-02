import React, {useEffect, useState} from "react";
import {EventColumns} from './event-columns.tsx'
import {Table} from "@/components/ui/table/table.tsx";
import DeleteDialog from "@/components/ui/dialog/delete-dialog.tsx";
import {useEventStore} from "@/stores/eventStore.tsx";
import EventCreateDialog from "@/features/event/components/event-create-dialog.tsx";
import EventEditDialog from "@/features/event/components/event-edit-dialog.tsx";

const EventTable: React.FC = () => {
    const {events, fetchEvents, editEvent, createEvent, removeEvent} = useEventStore();

    const [editOpen, setEditOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [createOpen, setCreateOpen] = useState(false);

    const [selectedId, setSelectedId] = useState<number | null>(null);

    useEffect(() => {
        fetchEvents().catch((error) => {
            console.error(error)
            throw new Error("Events cannot be loaded");
        })
    }, [fetchEvents]);

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
                              if (selectedId !== null)
                                  await removeEvent(selectedId);
                          }}
                          setOpen={setDeleteOpen} />

            <EventEditDialog open={editOpen}
                               onEdit={async (name) => {
                                   if (selectedId !== null)
                                       await editEvent(selectedId, name);
                               }}
                               setOpen={setEditOpen} />

            <EventCreateDialog open={createOpen}
                                 onCreate={async (name) => {
                                     await createEvent(name)
                                     await fetchEvents()

                                     setCreateOpen(false)
                                 }}
                                 setOpen={setCreateOpen} />
        </div>
    )
}

export default EventTable;