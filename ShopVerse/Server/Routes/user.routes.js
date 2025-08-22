//we can also write import {Router} from 'express'
import express from 'express'
import {signUp,signIn} from '../Controller/user.controller.js'
const router = express.Router()

router.post('/signUp',signUp)
router.post('/signIn',signIn)

export default router
