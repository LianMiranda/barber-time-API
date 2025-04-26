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
    } catch (err) {     
      if (err instanceof AppError){
        return res.status(err.statusCode).json({ message: err.message });
      }

      return res.status(500).json({ message: "Internal server error" });
    }
  }

  async findAll(req: Request, res: Response) {
    try {
      const customers = await this.customerUseCase.findAll();

      return res.status(200).json({ customers });
    } catch (err) {
      if (err instanceof AppError)
        return res.status(err.statusCode).json({ message: err.message });

      return res.status(500).json({ message: "Internal server error" });
    }
  }

  async findById(req: Request, res: Response) {
    const id = req.params.id;
    try {
      const customer = await this.customerUseCase.findById(id);

      return res.status(200).json({ customer });
    } catch (err) {
      console.error(err);

      if (err instanceof AppError)
        return res.status(err.statusCode).json({ message: err.message });

      return res.status(500).json({ message: "Internal server error" });
    }
  }

  async update(req: Request, res: Response) {
    const id = req.params.id;
    const data = req.body

    try {
      await this.customerUseCase.update(id, data);
      return res.status(200).json({message: "User updated successfully"});

    } catch (err) {
      console.error(err);

      if (err instanceof AppError)
        return res.status(err.statusCode).json({ message: err.message });

      return res.status(500).json({ message: "Internal server error" });
    }
  }

  async delete(req: Request, res: Response) {
    const id = req.params.id;

    try {
      await this.customerUseCase.delete(id);
      return res.status(200).json({message: "User deleted successfully"});

    } catch (err) {
      console.error(err);

      if (err instanceof AppError)
        return res.status(err.statusCode).json({ message: err.message });

      return res.status(500).json({ message: "Internal server error" });
    }
  }
}

export { CustomerController };
