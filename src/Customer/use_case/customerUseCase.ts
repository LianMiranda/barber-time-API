/* eslint-disable @typescript-eslint/no-explicit-any */
import { v4 } from "uuid";
import { RepositoryInterface } from "../adapter/repository/repositoryInterface";
import { Customer } from "../entity/customer";
import { CustomerUseCaseInterface } from "./useCaseInterface";
import { AppError } from "../../shared/errors/appError";
import { compare, hash } from "../../shared/bcrypt/encryption";
import { emailValidator } from "../../shared/validations/emailValidatior";
import { cpfValidator } from "../../shared/validations/cpfValidator";
import { sign } from "../../shared/validations/jwt";

class CustomerUseCase implements CustomerUseCaseInterface {
  constructor(private repository: RepositoryInterface) {}

  async save(customer: Customer): Promise<boolean | Error> {
    const isNotEmpty = Object.values(customer).every(
      (value) => value !== null && value !== undefined && value.trim() !== ""
    );

    if (!isNotEmpty) {
      throw new AppError(400, "Data cannot be empty");
    }
    
    const emailVerification = await emailValidator(customer.email);

    if (!emailVerification) throw new AppError(400, "Invalid email");

    const cpfVerification = await cpfValidator(customer.cpf);
    if (!cpfVerification) throw new AppError(400, "Invalid CPF");

    customer.id = v4();

    const hash_password = await hash(customer.password);

    customer.password = hash_password;

    try {
      return await this.repository.save(customer);
    } catch (err: any) {
      console.error(err);

      if (err.code == "ER_DUP_ENTRY") {
        throw new AppError(
          409,
          "There is already a user with that email or CPF"
        );
      }

      throw err;
    }
  }

  async authenticate(email: string, password: string): Promise<string | Error> {
    if (!email || !password)
      throw new AppError(400, "Fields cannot be empty");

    const user = await this.findByEmail(email);    

    if (!user) throw new AppError(404, "Invalid credentials");

    const passwordVerification = await compare(password, user.password);

    if (!passwordVerification) throw new AppError(400, "Invalid credentials");

    const token = await sign(user);

    return token;
  }

  async findAll(): Promise<Customer[]> {
    const customer = await this.repository.findAll();

    if (customer.length == 0) throw new AppError(404, "No users found");
    return customer;
  }

  async findById(id: string): Promise<Customer> {
    const customer = await this.repository.findById(id);

    if (customer.length == 0) throw new AppError(404, "No users found");
    
    return customer[0];
  }

  async findByEmail(email: string): Promise<Customer | undefined> {
    const customer = await this.repository.findByEmail(email);

    if (customer.length == 0) return undefined

    return customer[0];
  }

  async update(id: string, data: Partial<Customer>): Promise<boolean | Error> {
    if (!id) throw new AppError(400, "Invalid id");

    const userExists = await this.findById(id);

    if (userExists == undefined) throw new AppError(404, "No users found");

    const isNotEmpty = Object.values(data).some(
      (value: string) =>
        value !== null && value !== undefined && value.trim() !== ""
    );

    if (!isNotEmpty) {
      throw new AppError(
        400,
        "Enter at least one piece of information to update"
      );
    }

    const validFields = Object.fromEntries(
      Object.entries(data).filter(
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        ([_, value]) =>
          value !== undefined && value !== null && value.trim() !== ""
      )
    );

    if (validFields.email) {
      const emailVerification = await emailValidator(validFields.email);
      if (!emailVerification) throw new AppError(400, "Invalid email");
    }

    if (validFields.cpf) {
      const cpfVerification = await cpfValidator(validFields.cpf);
      if (!cpfVerification) return cpfVerification;
    }

    if (validFields.new_password) {
      if (!validFields.current_password)
        throw new AppError(
          400,
          "Current password is required to update the password"
        );

      const passwordVerification = await compare(
        validFields.current_password,
        userExists.password
      );

      if (!passwordVerification)
        throw new AppError(400, "Current password is incorrect");

      const hash_password = await hash(validFields.new_password);
      validFields.password = hash_password;

      delete validFields.current_password;
      delete validFields.new_password;
    }

    try {
      return await this.repository.update(id, validFields);
    } catch (err: any) {
      console.error(err);

      if (err.code == "ER_DUP_ENTRY")
        throw new AppError(
          409,
          "There is already a user with that email or CPF"
        );

      throw err;
    }
  }

  async delete(id: string): Promise<boolean | Error> {
    try {
      const userExists = await this.findById(id);
      if (userExists == undefined) throw new AppError(404, "No users found");

      await this.repository.delete(id);
      return true;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
}

export { CustomerUseCase };
