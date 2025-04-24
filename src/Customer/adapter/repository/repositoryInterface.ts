import { Customer } from "../../entity/customer"

export interface RepositoryInterface{
    save(customer: Customer):Promise<boolean|Error>
    findById(id: string):Promise<unknown>
    findAll():Promise<unknown>
    update(data: object):Promise<boolean| Error>
}