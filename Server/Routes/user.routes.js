import express from 'express'
const router = express.Router()
import {registerUser,returnUsers,delByID,editByID} from '../Controller/user.controller.js'


router.post('/',registerUser)
router.get('/',returnUsers)
router.delete('/:ID',delByID)
router.patch('/:ID',editByID)
export default router

