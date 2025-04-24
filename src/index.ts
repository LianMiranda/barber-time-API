import express from 'express'
const app = express();

app.use(express.urlencoded({extended: true}))   
app.use(express.json())

app.get("/", (req, res) => {
        res.send("API RODANDO 🚀")
})

export {app}