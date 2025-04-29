import { connection } from "../../../database/connection";
import { Appointment } from "../../entity/appointment";
import { AppointmentRepositoryInterface } from "./appointmentsRepositoryInterface";

class AppointmentRepository implements AppointmentRepositoryInterface {
  async create(appointment: Appointment): Promise<boolean> {
    const query = `INSERT INTO appointments (schedule_at, serviceId, customerId, status) VALUES (?, ?, ?, ?)`;
    const params = [
      appointment.schedule_at,
      appointment.serviceId,
      appointment.customerId,
      appointment.status,
    ];
    try {
      await connection.execute(query, params);
      return true;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
  async findAll(): Promise<Appointment[]> {
    const query = `SELECT * FROM appointments`;

    const [rows] = await connection.query(query);
    return rows as Appointment[];
  }

  async findById(id: number): Promise<Appointment[] | null> {
    const query = `SELECT * FROM appointments WHERE id = ?`;

    const [rows] = await connection.query(query, id);
    return rows as Appointment[] | null;
  }

  async findByCustomerId(customerId: string): Promise<Appointment[]> {
    const query = `SELECT * FROM appointments WHERE customerId = ?`;

    const [rows] = await connection.query(query, customerId);
    return rows as Appointment[];
  }

  async findByServiceId(serviceId: string): Promise<Appointment[]> {
    const query = `SELECT * FROM appointments WHERE serviceId = ?`;

    const [rows] = await connection.query(query, serviceId);
    return rows as Appointment[];
  }

  async findByDate(schedule_at: Date): Promise<Appointment[]> {
    const query = `SELECT * FROM appointments WHERE schedule_at = ?`;

    const [rows] = await connection.query(query, schedule_at);
    return rows as Appointment[];
  }

  async update(id: string, data: Partial<Appointment>): Promise<boolean> {
    const fields = Object.keys(data);
    const values = Object.values(data);

    if (fields.length === 0) return false;

    const setClause = fields.map((field) => `${field} = ?`).join(", ");

    const query = `UPDATE appointments SET ${setClause}, status = ? WHERE id = ?`;

    try {
      await connection.execute(query, [...values, id]);
      return true;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  async delete(id: number): Promise<boolean> {
    const query = `DELETE FROM appointments WHERE id = ? LIMIT 1`;
    try {
      await connection.execute(query, [id]);
      return true;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
}

export { AppointmentRepository };
