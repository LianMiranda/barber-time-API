import { Customer } from "../../entity/customer"

export interface RepositoryInterface{
    save(customer: Customer):Promise<boolean|Error>
    findById(id: string):Promise<Customer|Error>
    findAll():Promise<Customer[] | null | Error>
    update(data: object):Promise<boolean| Error>
}