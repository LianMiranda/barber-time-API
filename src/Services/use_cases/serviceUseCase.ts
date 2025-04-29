import { v4 } from "uuid";
import { ServicesRepositoryInterface } from "../adapter/repository/servicesRepositoryInterface";
import { Service } from "../entity/service";
import { ServiceUseCaseInterface } from "./serviceUseCaseInterface";
import { AppError } from "../../shared/errors/appError";

class ServiceUseCase implements ServiceUseCaseInterface {
  constructor(private repository: ServicesRepositoryInterface) {}

  async save(data: Service): Promise<boolean | Error> {
    const isNotEmpty = Object.entries(data).every(
      (value) =>
        value !== null && value !== undefined && value.toString().trim() !== ""
    );

    if (!isNotEmpty) {
      throw new AppError(400, "Data cannot be empty");
    }

    data.id = v4();

    try {
      return await this.repository.createService(data);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async getAll(): Promise<Service[]> {
    const services = await this.repository.getAllServices();

    if (services.length == 0) throw new AppError(404, "No services found");

    return services;
  }

  async getById(id: string): Promise<Service> {
    const service = await this.repository.getServiceById(id);

    if (service.length == 0) throw new AppError(404, "Service not found");

    return service[0];
  }

  async update(id: string, data: Partial<Service>): Promise<boolean|Error> {
    const isNotEmpty = Object.values(data).some(
      (value) =>
        value !== null && value !== undefined && value.toString().trim() !== ""
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
          value !== null &&
          value !== undefined &&
          value.toString().trim() !== ""
      )
    );

    try {
        return await this.repository.updateService(id, validFields);
    } catch (error) {
      console.error(error);
      throw error; 
    }
  }

  async delete(id: string): Promise<boolean|Error> {
    const verifyServiceExists = await this.getById(id);
    if(!verifyServiceExists ) return verifyServiceExists;

    return await this.repository.deleteService(id)
  }
}

export { ServiceUseCase };
