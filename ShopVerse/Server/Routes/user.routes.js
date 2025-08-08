//we can also write import {Router} from 'express'
import express from 'express'
import {createUser} from '../Controller/user.controller.js'
const router = express.Router()
router.post('/create',createUser)

export default router
