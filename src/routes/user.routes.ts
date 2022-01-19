import { Router } from "express";
const router = Router()

import { ValidationMiddleware } from "../middlewares";
import * as UserController from '../controllers/user.controllers'
import CreateUserDto from "../dtos/user.dto";

router.post('/create', ValidationMiddleware(CreateUserDto), UserController.postOne) 
router.get('/average', UserController.getAverage)
router.get('/list', UserController.getList)
router.delete('/:id', UserController.deleteById)

export default router