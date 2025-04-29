import express from "express";
import { serviceController } from "../services.module";

export const serviceRoutes = express.Router();

serviceRoutes.post("/service", async (req, res) => {
  await serviceController.createService(req, res);
});

serviceRoutes.get("/services", async (req, res) => {
  await serviceController.getAllServices(req, res);
});

serviceRoutes.get("/service/:id", async (req, res) => {
  await serviceController.getServiceById(req, res);
});

serviceRoutes.put("/service/:id", async (req, res) => {
  await serviceController.updateService(req, res);
});

serviceRoutes.delete("/service/:id", async (req, res) => {
  await serviceController.deleteService(req, res);
});
