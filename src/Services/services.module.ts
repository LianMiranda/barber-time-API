import { ServiceController } from "./adapter/controller/servicesController";
import { ServicesRepository } from "./adapter/repository/servicesRepository";
import { ServiceUseCase } from "./use_cases/serviceUseCase";

const repository = new ServicesRepository();
const serviceUseCase = new ServiceUseCase(repository);
const serviceController = new ServiceController(serviceUseCase);

export { serviceController };
