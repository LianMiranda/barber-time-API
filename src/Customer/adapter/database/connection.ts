import { config } from "dotenv";
import fs from "fs";
import mysql from "mysql2";
config();
const host = process.env.DB_HOST;
const user = process.env.DB_USER;
const password = process.env.DB_PASS;
const database = process.env.DB_DATABASE;
const port = process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306;

const connection = mysql.createConnection({
  host,
  user,
  password,
  database,
  port,
  multipleStatements: true,
});

connection.connect((err) => {
  if (err) {
    console.error("Error connecting to database:", err);
    return;
  }

  console.log("Database connection successful!");

  const sql = fs.readFileSync("init.sql", "utf-8");
  connection.query(sql, (err) => {
    if (err) {
      console.error("Erro ao executar o SQL:", err);
    } else {
      console.log("Tabelas verificadas/criadas com sucesso!");
    }
  });
});

export { connection };
