import express from 'express'
import { createProduct, getProductById, getSellerProducts } from '../Controller/product.controller.js'
import { upload } from '../config/cloudinary.js'
import { authenticate, restricto } from '../Middlewares/authenticate.middleware.js'
const router = express.Router()

router.post('/',upload.single("productImage"),authenticate,restricto('seller') ,createProduct)
router.get('/',authenticate,restricto('seller'),getSellerProducts)
router.post('/:productId',getProductById)

export default router