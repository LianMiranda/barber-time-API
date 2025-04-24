import { CustomerUseCase } from "./use_case/customerUseCase";
import { RepositoryInterface } from "./adapter/repository/repositoryInterface";
import { CustomerController } from "./adapter/controller/customerController";
import { DatabaseRepository } from "./adapter/repository/customerRepository";

const repository: RepositoryInterface = new DatabaseRepository()
const useCase = new CustomerUseCase(repository)
const controller = new CustomerController(useCase)

export {controller}