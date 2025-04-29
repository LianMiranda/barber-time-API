import { AppointmentController } from "./adapter/controller/appointmentsController";
import { AppointmentRepository } from "./adapter/repository/appointmentsRepository";
import { AppointmentUseCase } from "./use_case/appointmentsUseCase";

const repository = new AppointmentRepository();
const useCase = new AppointmentUseCase(repository);
const controller = new AppointmentController(useCase);

export { controller }