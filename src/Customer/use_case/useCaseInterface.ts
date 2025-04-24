import { Customer } from "../entity/customer"

interface CustomerUseCaseInterface{
    save(customer: Customer):Promise<void>
    findAll():Promise<unknown>
}

export {CustomerUseCaseInterface}