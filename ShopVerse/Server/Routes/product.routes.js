import express from 'express'
import { applyFlashSale, createProduct, getFlashSales, getProductById, getProducts, getSellerProducts, updateSellerProduct } from '../Controller/product.controller.js'
import { upload } from '../config/cloudinary.js'
import { authenticate, restricto } from '../Middlewares/authenticate.middleware.js'
const router = express.Router()

router.post('/',upload.single("productImage"),authenticate,restricto('seller') ,createProduct)

router.get('/',authenticate,restricto('seller'),getSellerProducts)
router.get('/getProducts',getProducts)
router.get('/getFlashSales',getFlashSales)
router.get('/:productId',getProductById)


router.patch('/applyFlashSale/:productId',authenticate,restricto('admin'),applyFlashSale)
router.patch('/:productId',upload.single("productImage"),authenticate,restricto('seller'), updateSellerProduct)



// router.get('/get',getProducts)

export default router