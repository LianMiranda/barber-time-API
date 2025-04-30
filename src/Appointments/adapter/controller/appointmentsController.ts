import { AppError } from "../../../shared/errors/appError";
import { AppointmentUseCaseInterface } from "../../use_case/appointmentsUseCaseInterface";
import { Request, Response } from "express";
class AppointmentController {
  constructor(private appointmentUseCase: AppointmentUseCaseInterface) {}

  async create(req: Request, res: Response) {
    const data = req.body;
    try {
        await this.appointmentUseCase.create(data);
        res.status(201).json({ message: "Appointment created successfully" });
    } catch (err) {
      console.error(err);
      if (err instanceof AppError) {
        return res.status(err.statusCode).json({ message: err.message });
      }
      
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  async findAll(req: Request, res: Response) {
    try {
      const appointments = await this.appointmentUseCase.findAll();
      res.status(200).json({ appointments });
    } catch (err) {
      console.error(err);
      if (err instanceof AppError) {
        return res.status(err.statusCode).json({ message: err.message });
      }

      return res.status(500).json({ message: "Internal server error" });
    }
  }

  async findById(req: Request, res: Response) {
    const id = req.params.id;
    try {
      const appointment = await this.appointmentUseCase.findById(id);
      res.status(200).json({ appointment });
    } catch (err) {
      console.error(err);
      if (err instanceof AppError) {
        return res.status(err.statusCode).json({ message: err.message });
      }

      return res.status(500).json({ message: "Internal server error" });
    }
  }
  async findByCustomerId(req: Request, res: Response) {
    const customerId = req.params.customerId;
    try {
      const appointments = await this.appointmentUseCase.findByCustomerId(customerId);
      res.status(200).json({ appointments });
    } catch (err) {
      console.error(err);
      if (err instanceof AppError) {
        return res.status(err.statusCode).json({ message: err.message });
      }

      return res.status(500).json({ message: "Internal server error" });
    }
  }

  async findByServiceId(req: Request, res: Response) {
    const serviceId = req.params.serviceId;
    console.log(serviceId);
    try {
      const appointments = await this.appointmentUseCase.findByServiceId(serviceId);
      res.status(200).json({ appointments });
    } catch (err) {
      console.error(err);
      if (err instanceof AppError) {
        return res.status(err.statusCode).json({ message: err.message });
      }

      return res.status(500).json({ message: "Internal server error" });
    }
  }

  async findByDate(req: Request, res: Response) {
    const schedule_at = new Date(req.params.schedule_at);
    try {
      const appointments = await this.appointmentUseCase.findByDate(schedule_at);
      res.status(200).json({ appointments });
    } catch (err) {
      console.error(err);
      if (err instanceof AppError) {
        return res.status(err.statusCode).json({ message: err.message });
      }

      return res.status(500).json({ message: "Internal server error" });
    }
  }

  async update(req: Request, res: Response) {
    const id = req.params.id;
    const data = req.body;
    try {
      await this.appointmentUseCase.update(id, data);
      res.status(200).json({ message: "Appointment updated successfully" });
    } catch (err) {
      console.error(err);
      if (err instanceof AppError) {
        return res.status(err.statusCode).json({ message: err.message });
      }

      return res.status(500).json({ message: "Internal server error" });
    }
  }

  async delete(req: Request, res: Response) {
    const id = req.params.id;
    try {
      await this.appointmentUseCase.delete(id);
      res.status(200).json({ message: "Appointment deleted successfully" });
    } catch (err) {
      console.error(err);
      if (err instanceof AppError) {
        return res.status(err.statusCode).json({ message: err.message });
      }

      return res.status(500).json({ message: "Internal server error" });
    }
  }
}

export { AppointmentController };
