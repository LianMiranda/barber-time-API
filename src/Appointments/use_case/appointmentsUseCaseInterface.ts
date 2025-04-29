import { Appointment } from "../entity/appointment";

export interface AppointmentUseCaseInterface {
    create(data: Appointment):Promise<boolean>
    findAll(): Promise<Appointment[]>;
    findById(id: string): Promise<Appointment>;
    findByCustomerId(customerId: string): Promise<Appointment[]>;
    findByServiceId(serviceId: string): Promise<Appointment[]>;
    findByDate(date: Date): Promise<Appointment[]>;
    update(id: string, data: Partial<Appointment>): Promise<boolean|Error>;
    delete(id: string): Promise<boolean>;
}