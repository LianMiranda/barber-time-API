import { Appointment } from "../../entity/appointment";

export interface AppointmentRepositoryInterface {
    create(data: Appointment):Promise<boolean>
    findAll(): Promise<Appointment[]>;
    findById(id: string): Promise<Appointment[]>;
    findByCustomerId(customerId: string): Promise<Appointment[]>;
    findByServiceId(serviceId: string): Promise<Appointment[]>;
    findByDate(schedule_at: Date): Promise<Appointment[]>;
    update(id: string, data: Partial<Appointment>): Promise<boolean>;
    delete(id: string): Promise<boolean>;
}