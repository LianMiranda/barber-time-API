import express from 'express'
import { connection } from './Customer/adapter/database/connection';
const app = express();
app.use(express.urlencoded({extended: true}))   
app.use(express.json())
app.get("/", (req, res) => {
        res.send("API RODANDO 🚀")
})


connection.connect(() => {
        console.log("Database connection successful!");
})

export {app}
