import { Appointment } from "../../entity/appointment";

export interface AppointmentRepositoryInterface {
    create(appointment: Appointment):Promise<boolean>
    findAll(): Promise<Appointment[]>;
    findById(id: number): Promise<Appointment[] | null>;
    findByCustomerId(customerId: string): Promise<Appointment[]>;
    findByServiceId(serviceId: string): Promise<Appointment[]>;
    findByDate(date: Date): Promise<Appointment[]>;
    update(id: string, appointment: Appointment): Promise<boolean>;
    delete(id: number): Promise<boolean>;
}