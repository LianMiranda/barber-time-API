import { Customer } from "../entity/customer";

interface CustomerUseCaseInterface {
  save(customer: Customer): Promise<boolean | Error>;
  findAll(): Promise<Customer[]>;
  findById(id: string): Promise<Customer>;
  findByEmail(id: string): Promise<Customer | undefined>;
  authenticate(email: string, password: string): Promise<string | Error>;
  update(id: string, data: Partial<Customer>): Promise<boolean | Error>;
  delete(id: string): Promise<boolean | Error>;
}

export { CustomerUseCaseInterface };
