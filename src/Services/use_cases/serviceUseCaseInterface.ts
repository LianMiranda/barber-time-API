import { Service } from "../entity/service";

export interface ServiceUseCaseInterface {
    save(data: Service): Promise<boolean|Error>;
    getAll(): Promise<Service[]>;
    getById(id: string): Promise<Service>;
    update(id: string, data: Partial<Service>): Promise<boolean|Error>;
    delete(id: string): Promise<boolean|Error>;
}