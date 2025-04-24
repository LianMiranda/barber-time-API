import { config } from "dotenv"
import mysql from "mysql2"
config()
const host = process.env.DB_HOST
const user = process.env.DB_USER
const password = process.env.DB_PASS
const database = process.env.DB_DATABASE

const connection = mysql.createConnection({
    host,
    user,
    password,
    database,
});

export {connection}