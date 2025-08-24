import express from 'express'
import { createCart } from '../Controller/cart.controller.js'

const router = express.Router()


router.post('/',createCart)



export default router