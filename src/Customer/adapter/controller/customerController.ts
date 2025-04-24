import { CustomerUseCaseInterface } from "../../use_case/useCaseInterface";
import { Customer } from "../../entity/customer";
import { Request, Response } from "express";
import { AppError } from "../../../shared/errors/appError";
class CustomerController {
  constructor(private useCase: CustomerUseCaseInterface) {}

  async save(req: Request, res: Response) {
    try {
      const data: Customer = req.body;
      
      await this.useCase.save(data);

      return res.status(201).json({ message: "Usuário criado com sucesso" });
    } catch (error) {
      if (error instanceof AppError)
        return res.status(error.statusCode).json({ message: error.message });

      return res.status(500).json({ message: "Internal server error" });
    }
  }
}

export { CustomerController };
