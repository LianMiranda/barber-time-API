import { connection } from "../../../database/connection";
import { Service } from "../../entity/service";
import { ServicesRepositoryInterface } from "./servicesRepositoryInterface";

class ServicesRepository implements ServicesRepositoryInterface {
  async createService(serviceData: Service): Promise<boolean | Error> {
    const query = `INSERT INTO services (id, name,price, duration_minutes) VALUES (?, ?, ?, ?)`;
    const values = [
      serviceData.id,
      serviceData.name,
      serviceData.price,
      serviceData.duration_minutes,
    ];
    try {
      await connection.execute(query, values);
      return true;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  async getAllServices(): Promise<Service[]> {
    const query = "SELECT * FROM services";
    const [rows] = await connection.query(query);
    return rows as Service[];
  }

  async getServiceById(id: string): Promise<Service[]> {
    const query = "SELECT * FROM services WHERE id=?";
    const [rows] = await connection.query(query, id);
    return rows as Service[];
  }

  async updateService(id: string, serviceData: Partial<Service>): Promise<boolean | Error> {
    const fields = Object.keys(serviceData);
    const values = Object.values(serviceData);

    if (fields.length === 0) return false;

    const setClause = fields.map((field) => `${field} = ?`).join(", ");
    const query = `UPDATE services SET ${setClause} WHERE id=?`;

    try {
        await connection.execute(query, [...values, id]);
        return true;
    } catch (err) {
        console.error(err);
        throw err; 
    }
  }

  async deleteService(id: string): Promise<boolean | Error> {
    const query= "DELETE FROM services WHERE id=?";
    try {
      await connection.execute(query, [id]);
      return true;
    } catch (err) {
      console.error(err);
      throw err;
    }

  }
}

export { ServicesRepository };
