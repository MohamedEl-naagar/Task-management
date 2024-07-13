import express from 'express'
import { validation } from '../../middleware/validation.js'
import { addCategory, deleteCategory, getAllCategories, getSingleCategory, updateCategory } from "./category.controller.js"
import { addCategoryValidation, paramsIdValidation, updateCategoryValidation } from './category.validation.js'
import {  protectedRoutes } from '../auth/auth.controller.js'
const categoryRoute = express.Router()



categoryRoute
        .route('/')
        .get(protectedRoutes,getAllCategories)        
        .post(protectedRoutes,validation(addCategoryValidation), addCategory); 
categoryRoute
    .route('/:id')
    .get(validation(paramsIdValidation),getSingleCategory)
    .put(protectedRoutes,validation(updateCategoryValidation),updateCategory)
    .delete(protectedRoutes,validation(paramsIdValidation),deleteCategory)

export default categoryRoute