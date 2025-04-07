export enum EmployeeType {
    MECHANIC,
    WELDER,
    ELECTRICIAN,
    FOREMAN,
    SUPERVISOR
}

export type Employee = {
    id: number,
    name: string;

    type: EmployeeType;
};