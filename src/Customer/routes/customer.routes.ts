import express from "express";
import { controller } from "../consumer.module";

const router = express.Router();

router.post("/customer", async (req, res) => {
  controller.save(req, res);
});

router.get("/customers", async (req, res) => {
  controller.findAll(req, res);
});

router.get("/customer/:id", async (req, res) => {
  controller.findById(req, res);
});

router.put("/customer/:id", async (req, res) => {
  controller.update(req, res);
});

export { router };
