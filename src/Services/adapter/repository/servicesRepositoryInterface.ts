import { Service } from "../../entity/service";

interface ServicesRepositoryInterface {
  getAllServices(): Promise<Service[]>;
  getServiceById(id: string): Promise<Service[]>;
  createService(serviceData: Service): Promise<boolean | Error>;
  updateService(id: string, serviceData: Partial<Service>): Promise<boolean | Error>;
  deleteService(id: string): Promise<boolean | Error>;
}

export { ServicesRepositoryInterface}