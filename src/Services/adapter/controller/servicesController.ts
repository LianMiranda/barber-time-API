import { Request, Response } from "express";
import { ServiceUseCaseInterface } from "../../use_cases/serviceUseCaseInterface";
import { AppError } from "../../../shared/errors/appError";
import { Service } from "../../entity/service";

class ServiceController {
  constructor(private serviceUseCase: ServiceUseCaseInterface) {}

  async createService(req: Request, res: Response): Promise<Response> {
    const data: Service = req.body;
    try {
      await this.serviceUseCase.save(data);

      return res.status(201).json({ message: "Service created successfully" });
    } catch (err) {
      if (err instanceof AppError) {
        return res.status(err.statusCode).json({ message: err.message });
      }

      return res.status(500).json({ message: "Internal server error" });
    }
  }

  async getAllServices(req: Request, res: Response): Promise<Response> {
    try {
      const services: Service[] = await this.serviceUseCase.getAll();

      return res.status(200).json({ services });
    } catch (err) {
      if (err instanceof AppError) {
        return res.status(err.statusCode).json({ message: err.message });
      }

      return res.status(500).json({ message: "Internal server error" });
    }
  }

  async getServiceById(req: Request, res: Response): Promise<Response> {
    const id: string = req.params.id;

    try {
      const service: Service = await this.serviceUseCase.getById(id);

      return res.status(200).json({ service });
    } catch (err) {
      if (err instanceof AppError) {
        return res.status(err.statusCode).json({ message: err.message });
      }

      return res.status(500).json({ message: "Internal server error" });
    }
  }

  async updateService(req: Request, res: Response): Promise<Response> {
    const id: string = req.params.id;
    const data: Partial<Service> = req.body;
    try {
        await this.serviceUseCase.update(id, data);
        return res.status(200).json({ message: "Service updated successfully" });
    } catch (err) {
        if(err instanceof AppError) {
            return res.status(err.statusCode).json({ message: err.message });
        }

        return res.status(500).json({ message: "Internal server error" });
    }
  }

  async deleteService(req: Request, res: Response): Promise<Response> {
    const id = req.params.id;
    try {
        await this.serviceUseCase.delete(id);
        return res.status(200).json({ message: "Service deleted successfully" });
    } catch (err) {
        if(err instanceof AppError) {
            return res.status(err.statusCode).json({ message: err.message });
        }

        return res.status(500).json({ message: "Internal server error" });
    }
  }
}

export { ServiceController };
