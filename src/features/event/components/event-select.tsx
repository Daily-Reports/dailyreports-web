import SelectValue from "@/components/ui/form/select-value.tsx";
import React from "react";
import {Event} from "@/types/event.tsx";

type EventSelectProps = {
    events: Event[];
    selectValue: Event | null;
    setSelectedValue: (value: Event | null) => void;
};

const EventSelect: React.FC<EventSelectProps> = ({events, selectValue, setSelectedValue}) => {
    const formattedEvents = events.map((event) => ({
        value: event,
        label: event.name,
    }));

    return (
        <div className="App">
            <SelectValue
                title={"Event"}
                placeholder={"Select an event..."}
                options={formattedEvents}
                selectValue={selectValue}
                setSelectValue={setSelectedValue}
                compareFn={(a, b) => a.id === b.id}
            />
        </div>
    );
};

export default EventSelect;