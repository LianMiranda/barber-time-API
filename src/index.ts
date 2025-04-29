import express from "express";
const app = express();
import "./database/connection";
import { router } from "./Customer/routes/customer.routes";
import { serviceRoutes } from "./Services/routes/service.routes";
import { appointmentRoutes } from "./Appointments/routes/appointments.routes";

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.get("/", (req, res) => {
  res.send("API RODANDO 🚀");
});
app.use("/api",router, serviceRoutes, appointmentRoutes);
export { app };
