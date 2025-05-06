import { v4 } from "uuid";
import { AppError } from "../../shared/errors/appError";
import { AppointmentRepositoryInterface } from "../adapter/repository/appointmentsRepositoryInterface";
import { Appointment } from "../entity/appointment";
import { AppointmentUseCaseInterface } from "./appointmentsUseCaseInterface";

class AppointmentUseCase implements AppointmentUseCaseInterface {
  constructor(private appointmentRepository: AppointmentRepositoryInterface) {}

  async create(data: Appointment): Promise<boolean> {
    const checkEmptyFields = Object.values(data).every(
      (value) =>
        value !== null && value !== undefined && value.toString().trim() !== ""
    );

    if (!checkEmptyFields) {
      throw new AppError(400, "Data cannot be empty");
    }
    
    if(data.schedule_at) {
      const schedule_at = new Date(data.schedule_at);
      const currentDate = new Date();

      if (schedule_at < currentDate) {
        throw new AppError(400, "Schedule date cannot be in the past");
      }
    }

    data.id = v4();
    data.status = "in progress";
    try {
      return await this.appointmentRepository.create(data);
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  async findAll(): Promise<Appointment[]> {
    const appointments = await this.appointmentRepository.findAll();

    if (appointments.length == 0)
      throw new AppError(404, "No appointments found");

    return appointments;
  }

  async findById(id: string): Promise<Appointment> {
    const appointment = await this.appointmentRepository.findById(id);
        
    if (appointment.length == 0)
      throw new AppError(404, "Appointment not found");

    return appointment[0];
  }

  async findByCustomerId(customerId: string): Promise<Appointment[]> {
    const appointments = await this.appointmentRepository.findByCustomerId(
      customerId
    );

    if (appointments.length == 0)
      throw new AppError(404, "No customers found");

    return appointments;
  }

  async findByServiceId(serviceId: string): Promise<Appointment[]> {
    const appointments = await this.appointmentRepository.findByServiceId(
      serviceId
    );
    if (appointments.length == 0)
      throw new AppError(404, "No services found");

    return appointments;
  }

  async findByDate(schedule_at: Date): Promise<Appointment[]> {
    const appointments = await this.appointmentRepository.findByDate(
      schedule_at
    );

    if (appointments.length == 0)
      throw new AppError(404, "No date found");

    return appointments;
  }

  async update(
    id: string,
    data: Partial<Appointment>
  ): Promise<boolean | Error> {
    const verifyAppointmentExists = await this.findById(id);
    if (!verifyAppointmentExists) {
      return verifyAppointmentExists;
    }

    const checkEmptyFields = Object.values(data).some(
      (value) =>
        value !== null && value !== undefined && value.toString().trim() !== ""
    );

    if (!checkEmptyFields) {
      throw new AppError(
        400,
        "Enter at least one piece of information to update"
      );
    }

    if(data.schedule_at) {
      const schedule_at = new Date(data.schedule_at);
      const currentDate = new Date();

      if (schedule_at < currentDate) {
        throw new AppError(400, "Schedule date cannot be in the past");
      }
    }
    
    const validFields = Object.fromEntries(
      Object.entries(data).filter(
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        ([_, value]) =>
          value !== undefined &&
          value !== null &&
          value.toString().trim() !== ""
      )
    );
    
    if(validFields.schedule_at) validFields.schedule_at = new Date(validFields.schedule_at);
    
    try {
      return this.appointmentRepository.update(id, validFields);
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  async delete(id: string): Promise<boolean> {
    const verifyAppointmentExists = await this.findById(id);
    if (!verifyAppointmentExists) {
      return verifyAppointmentExists;
    }
    try {
      return this.appointmentRepository.delete(id);
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
}
export { AppointmentUseCase };
