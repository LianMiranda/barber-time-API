import { Customer } from "../entity/customer";

interface CustomerUseCaseInterface {
  save(customer: Customer): Promise<void>;
  findAll(): Promise<Customer[]>;
  findById(id: string): Promise<Customer[]>;
  update(id: string, data: Partial<Customer>): Promise<void>;
}

export { CustomerUseCaseInterface };
