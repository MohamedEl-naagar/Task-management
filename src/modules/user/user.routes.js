import express from 'express'
import { validation } from '../../middleware/validation.js'
import {updateUser,deleteUser, getCurrentUser} from './user.controller.js'
import { updateUserVal } from './user.validation.js'

import { protectedRoutes } from '../auth/auth.controller.js'
   
    const UserRoute = express.Router()
   
    UserRoute
    .route('/')
    .put(protectedRoutes,validation(updateUserVal),updateUser)
    .delete(protectedRoutes,deleteUser)


    UserRoute
    .get('/currentuser',protectedRoutes,getCurrentUser)

   export default UserRoute