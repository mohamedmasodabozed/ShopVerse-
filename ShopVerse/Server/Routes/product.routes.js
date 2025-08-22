import express from 'express'
import { createProduct } from '../Controller/product.controller.js'
import { upload } from '../config/cloudinary.js'
const router = express.Router()

router.post('/',upload.single("productImage"),createProduct)

export default router