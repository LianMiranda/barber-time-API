import { Customer } from "../../entity/customer";
import { RepositoryInterface } from "./repositoryInterface";

class DatabaseRepository implements RepositoryInterface {
  save(customer: Customer): Promise<boolean | Error> {
    throw new Error("Method not implemented.");
  }
  findById(id: string): Promise<Customer> {
    throw new Error("Method not implemented.");
  }
  findAll(): Promise<Customer[] | null> {
    throw new Error("Method not implemented.");
  }
  update(data: object): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
}

export { DatabaseRepository };
