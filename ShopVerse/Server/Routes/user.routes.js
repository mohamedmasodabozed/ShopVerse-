//we can also write import {Router} from 'express'
import express from 'express'
import {signUp,signIn} from '../Controller/user.controller.js'
import { createCart } from '../Controller/cart.controller.js'
import { restricto } from '../Middlewares/authenticate.middleware.js'
const router = express.Router()

router.post('/signUp',signUp,createCart)
router.post('/signIn',signIn)


export default router
