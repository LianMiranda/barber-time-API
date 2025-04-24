import express from "express";
const app = express();
import "./Customer/adapter/database/connection";
import { router } from "./Customer/routes/customer.routes";

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.get("/", (req, res) => {
  res.send("API RODANDO 🚀");
});
app.use(router)
export { app };
