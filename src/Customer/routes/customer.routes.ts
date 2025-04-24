import express from 'express'
import { controller } from '../consumer.module'

const router = express.Router()

router.post('/customer', async(req,res) => {
    controller.save(req,res)
})

export {router}