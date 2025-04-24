import { v4 } from "uuid";
import { RepositoryInterface } from "../adapter/repository/repositoryInterface";
import { Customer } from "../entity/customer";
import { CustomerUseCaseInterface } from "./useCaseInterface";
import { AppError } from "../../shared/errors/appError";

class CustomerUseCase implements CustomerUseCaseInterface {
  constructor(private repository: RepositoryInterface) {}

  async save(customer: Customer): Promise<void> {
    try {
      customer.id = v4();

      const isNotEmpty = Object.values(customer).every(
        (value) => value !== null && value !== undefined && value.trim() !== ""
      );

      if (!isNotEmpty) {
        throw new AppError(400, "Data cannot be empty");
      }

      await this.repository.save(customer);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      if (err.code == "ER_DUP_ENTRY")
        throw new AppError(
          409,
          "There is already a user with that email or CPF"
        );
    }
  }

  async findAll(): Promise<Customer[]> {
    const customer = await this.repository.findAll();

    if (customer.length == 0)
      throw new AppError(404, "No users found");
    return customer;
  }

  async findById(id: string): Promise<Customer[]> {
    const customer = await this.repository.findById(id);

    if(customer.length == 0) throw new AppError(404,"No users found")
    return customer;
  }
}

export { CustomerUseCase };
