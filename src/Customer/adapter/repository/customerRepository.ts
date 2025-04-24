import { Customer } from "../../entity/customer";
import { connection } from "../database/connection";
import { RepositoryInterface } from "./repositoryInterface";

class DatabaseRepository implements RepositoryInterface {
  async save(customer: Customer): Promise<boolean | Error> {
    const query =
      "INSERT INTO customers (id,name,email,password,cpf,cellphone_number) VALUES (?,?,?,?,?,?)";

    const values = [
      customer.id,
      customer.full_name,
      customer.email,
      customer.password,
      customer.cpf,
      customer.cellphone_number,
    ];

    try {
      const create = await connection.query(query, values);

      if (create != undefined) return true;

      return false;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  async findAll(): Promise<unknown> {
    const query = "SELECT * FROM customers";
    const [rows] = await connection.query(query);
    
    return rows;
  }

  async findById(id: string): Promise<unknown> {
    throw new Error("Method not implemented.");
  }

  update(data: object): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
}

export { DatabaseRepository };
