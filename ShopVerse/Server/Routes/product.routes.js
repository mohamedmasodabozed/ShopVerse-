import express from 'express'
import { createProduct } from '../Controller/product.controller.js'

const router = express.Router()

router.post('/create',createProduct)

export default router