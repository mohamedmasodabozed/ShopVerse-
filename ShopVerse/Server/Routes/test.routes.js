//we can also write import {Router} from 'express'
import express from 'express'
import {Testing, testingProduct} from '../Controller/testing.controller.js'
const router = express.Router()
router.post('/user',Testing)
router.post('/product',testingProduct)

export default router
