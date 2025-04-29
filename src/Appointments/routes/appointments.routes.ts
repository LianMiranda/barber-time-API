import express from "express";
import { controller } from "../appointments.module";

export const appointmentRoutes = express.Router();

appointmentRoutes.post("/appointment", async (req, res) => {
  await controller.create(req, res);
});

appointmentRoutes.get("/appointments", async (req, res) => {
  await controller.findAll(req, res);
});

appointmentRoutes.get("/appointment/:id", async (req, res) => {
  await controller.findById(req, res);
});

appointmentRoutes.get(
  "/appointments/customer/:customerId",
  async (req, res) => {
    await controller.findByCustomerId(req, res);
  }
);

appointmentRoutes.get("/appointments/service/:sercviceId", async (req, res) => {
  await controller.findByServiceId(req, res);
});

appointmentRoutes.get("/appointments/date", async (req, res) => {
  await controller.findByDate(req, res);
});

appointmentRoutes.put("/appointment/:id", async (req, res) => {
  await controller.update(req, res);
});

appointmentRoutes.delete("/appointment/:id", async (req, res) => {
  await controller.delete(req, res);
});
