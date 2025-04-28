import { Customer } from "../../entity/customer";

export interface RepositoryInterface {
  save(customer: Customer): Promise<boolean | Error>;
  findById(id: string): Promise<Customer[]>;
  findByEmail(id: string): Promise<Customer[]>;
  findAll(): Promise<Customer[]>;
  update(id: string, data: Partial<Customer>): Promise<boolean | Error>;
  delete(id: string): Promise<boolean | Error>
}
