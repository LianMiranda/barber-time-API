import { CustomerUseCaseInterface } from "../../use_case/useCaseInterface";
import { Customer } from "../../entity/customer";
import { Request, Response } from "express";
import { AppError } from "../../../shared/errors/appError";
class CustomerController {
  constructor(private customerUseCase: CustomerUseCaseInterface) {}

  async save(req: Request, res: Response) {
    const data: Customer = req.body;
    
    try {
      await this.customerUseCase.save(data);

      return res.status(201).json({ message: "User created successfully" });
    } catch (error) {
      if (error instanceof AppError)
        return res.status(error.statusCode).json({ message: error.message });

      return res.status(500).json({ message: "Internal server error" });
    }
  }

  async findAll(req: Request, res: Response) {
    try {
      const customers = await this.customerUseCase.findAll();

      return res.status(200).json({ customers });
    } catch (error) {
      if (error instanceof AppError)
        return res.status(error.statusCode).json({ message: error.message });

      return res.status(500).json({ message: "Internal server error" });
    }
  }

  async findById(req: Request, res: Response) {
    const id = req.params.id;
    try {
      const customer = await this.customerUseCase.findById(id);

      return res.status(200).json({ customer });
    } catch (error) {
      console.error(error);

      if (error instanceof AppError)
        return res.status(error.statusCode).json({ message: error.message });

      return res.status(500).json({ message: "Internal server error" });
    }
  }

  async update(req: Request, res: Response) {
    const id = req.params.id;
    const data = req.body

    try {
      await this.customerUseCase.update(id, data);
      return res.status(200).json({message: "User updated successfully"});

    } catch (error) {
      console.error(error);

      if (error instanceof AppError)
        return res.status(error.statusCode).json({ message: error.message });

      return res.status(500).json({ message: "Internal server error" });
    }
  }
}

export { CustomerController };
