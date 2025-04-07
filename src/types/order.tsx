export enum OrderSpeciality {
  MECHANICAL,
  ELECTRICAL,
  LUBRICATION,
  INSTRUMENTATION,
}

export enum OrderStatus {
  DONE,
  IN_PROGRESS,
  NOT_STARTED,
  CANCELED,
}

export type Order = {
  id: number;

  orderNumber: number;

  eventId: number;
  areaId: number;
  subareaId: number;

  speciality: OrderSpeciality;
  status: OrderStatus;

  description: string;
  technical: string;
};
