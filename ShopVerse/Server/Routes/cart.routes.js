import express from 'express'
import { addToCart, createCart, getCartItems, getCartLen, removeFromCart } from '../Controller/cart.controller.js'
import {authenticate,restricto} from '../Middlewares/authenticate.middleware.js'
const router = express.Router()

//used in signup route in user.routes.js
// router.post('/', authenticate,restricto('') ,createCart)
router.patch('/add/:productId',authenticate , restricto('customer','seller'),addToCart)

router.patch('/remove/:productId',authenticate , restricto('customer','seller'),removeFromCart)

router.get('/',authenticate , restricto('customer','seller'),getCartItems)
router.get('/length',authenticate , restricto('customer','seller'),getCartLen)

export default router