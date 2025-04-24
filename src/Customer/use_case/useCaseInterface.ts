import { Customer } from "../entity/customer";

interface CustomerUseCaseInterface {
  save(customer: Customer): Promise<void>;
  findAll(): Promise<Customer[]>;
  findById(id: string): Promise<Customer[]>;
}

export { CustomerUseCaseInterface };
