import express from "express";
const app = express();
import "./Customer/adapter/database/connection";

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.get("/", (req, res) => {
  res.send("API RODANDO 🚀");
});

export { app };
