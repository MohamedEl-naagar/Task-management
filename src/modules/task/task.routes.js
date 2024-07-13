import express from 'express'
import { validation } from '../../middleware/validation.js'
import {  addTask,deleteTask,getAllTasks,updateTask} from "./task.controller.js"
import {  addTaskValidation, paramsIdValidation,  updateTaskValidation } from './task.validation.js'
import { allowedTo, protectedRoutes } from '../auth/auth.controller.js'
const taskRoute = express.Router()



taskRoute
        .route('/')
        .get(getAllTasks)        
        .post(protectedRoutes,validation(addTaskValidation), addTask); 
taskRoute
    .route('/:id')
    .put(protectedRoutes,updateTask)
    .delete(protectedRoutes,validation(paramsIdValidation),deleteTask)

export default taskRoute