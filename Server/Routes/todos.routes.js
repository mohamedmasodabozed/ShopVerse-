import express from 'express'
import { readFileSync, writeFileSync } from 'fs'
const router = express.Router()
import {createTodo,getAll,editByID,delByID,QueryString} from '../Controller/todos.conroller.js'






router.post('/', createTodo)
router.get('/', getAll)
router.patch('/:ID', editByID)
router.delete('/:ID', delByID)
router.get('/', QueryString)
// router.delete('/:ID', Delete)

// router.get('/:ID',getByID)
// router.post('/', InsertTodo)

// router.patch('/:ID', UpdateTodo)

// router.get('/',QueryString)

export default router