import { Customer } from "../../entity/customer";

export interface RepositoryInterface {
  save(customer: Customer): Promise<boolean | Error>;
  findById(id: string): Promise<Customer[]>;
  findAll(): Promise<Customer[]>;
  update(data: object): Promise<boolean | Error>;
}
