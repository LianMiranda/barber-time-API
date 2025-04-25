/* eslint-disable @typescript-eslint/no-explicit-any */
import { Customer } from "../../entity/customer";
import { connection } from "../../../database/connection";
import { RepositoryInterface } from "./repositoryInterface";

class DatabaseRepository implements RepositoryInterface {
  async save(customer: Customer): Promise<boolean | Error> {
    const query =
      "INSERT INTO customers (id,full_name,email,password,cpf,cellphone_number) VALUES (?,?,?,?,?,?)";

    const values = [
      customer.id,
      customer.full_name,
      customer.email,
      customer.password,
      customer.cpf,
      customer.cellphone_number,
    ];

    try {
      await connection.query(query, values);
      return true;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  async findAll(): Promise<Customer[]> {
    const query = "SELECT * FROM customers";
    const [rows] = await connection.query(query);

    return rows as Customer[];
  }

  async findById(id: string): Promise<Customer[]> {
    const query = "SELECT * FROM customers WHERE id=?";
    const [rows] = await connection.query(query, id);

    return rows as Customer[];
  }

  async update(id: string, data: Partial<Customer>): Promise<boolean> {
    const fields = Object.keys(data);
    const values = Object.values(data);

    if (fields.length === 0) return false;

    const setClause = fields.map((field) => `${field} = ?`).join(", ");
    const query = `UPDATE customers SET ${setClause} WHERE id = ?`;

    try {
      await connection.query(query, [...values, id]);
      return true;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
}

export { DatabaseRepository };
