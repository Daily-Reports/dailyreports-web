import {Event} from "@/types/event.tsx";
import {Area} from "@/types/area.tsx";
import {Subarea} from "@/types/subarea.tsx";

export enum OrderSpeciality {
    MECHANICAL,
    ELECTRICAL,
    LUBRICATION,
    INSTRUMENTATION
}

export enum OrderStatus {
    DONE,
    IN_PROGRESS,
    NOT_STARTED,
    CANCELED
}

export type Order = {
    id: number,

    orderNumber: number

    eventId: Event
    areaId: Area
    subareaId: Subarea

    speciality: OrderSpeciality
    status: OrderStatus

    description: string
    technical: string
};