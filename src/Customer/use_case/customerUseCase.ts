/* eslint-disable @typescript-eslint/no-explicit-any */
import { v4 } from "uuid";
import { RepositoryInterface } from "../adapter/repository/repositoryInterface";
import { Customer } from "../entity/customer";
import { CustomerUseCaseInterface } from "./useCaseInterface";
import { AppError } from "../../shared/errors/appError";

class CustomerUseCase implements CustomerUseCaseInterface {
  constructor(private repository: RepositoryInterface) {}

  async save(customer: Customer): Promise<boolean | Error> {
    try {
      customer.id = v4();

      const isNotEmpty = Object.values(customer).every(
        (value) => value !== null && value !== undefined && value.trim() !== ""
      );  

      if (!isNotEmpty) {
        throw new AppError(400, "Data cannot be empty");
      }

      return await this.repository.save(customer);
    } catch (err: any) {
      console.error(err);

      if (err.code == "ER_DUP_ENTRY"){
        throw new AppError(
          409,
          "There is already a user with that email or CPF"       
        );     
      }

      throw err
    }
  }

  async findAll(): Promise<Customer[]> {
    const customer = await this.repository.findAll();

    if (customer.length == 0) throw new AppError(404, "No users found");
    return customer;
  }

  async findById(id: string): Promise<Customer[]> {
    const customer = await this.repository.findById(id);

    if (customer.length == 0) throw new AppError(404, "No users found");

    return customer;
  }

  async update(id: string, data: Partial<Customer>): Promise<boolean | Error> {
    const updateData: Partial<Customer> = {};

    if (!id) throw new AppError(400, "Invalid id");

    const userExists = await this.findById(id);
    if (userExists.length == 0) throw new AppError(404, "No users found");

    if (data.full_name) updateData.full_name = data.full_name;
    if (data.email) updateData.email = data.email;
    if (data.cpf) updateData.cpf = data.cpf;
    if (data.cellphone_number)
      updateData.cellphone_number = data.cellphone_number;

    const validDate = updateData;
    try {
      return await this.repository.update(id, validDate);
    } catch (err: any) {
      console.error(err);

      if (err.code == "ER_DUP_ENTRY")
        throw new AppError(
          409,
          "There is already a user with that email or CPF"
        );

      throw new AppError(500, "Internal server error");
    }
  }
}

export { CustomerUseCase };
