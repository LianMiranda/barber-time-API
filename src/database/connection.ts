import { config } from "dotenv";
import fs from "fs";
import mysql from "mysql2/promise";

config();

const host = process.env.DB_HOST;
const user = process.env.DB_USER;
const password = process.env.DB_PASS;
const database = process.env.DB_DATABASE;
const port = process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306;

let connection: mysql.Connection;

async function initDatabase() {
  try {
    connection = await mysql.createConnection({
      host,
      user,
      password,
      database,
      port,
      multipleStatements: true,
    });

    console.log("Database connection successful!");

    const sql = fs.readFileSync("init.sql", "utf-8");
    await connection.query(sql);

    console.log("Tabelas verificadas/criadas com sucesso!");
  } catch (error) {
    console.error("Erro ao conectar ou inicializar banco de dados:", error);
    process.exit(1);
  }
}

initDatabase();

export { connection };
