import express from 'express'
import { validation } from '../../middleware/validation.js'
import {  signinVal, signupVal } from './auth.validation.js'
import { signUp,signIn } from './auth.controller.js'

const authRoutes = express.Router()
authRoutes.post('/signup',validation(signupVal),signUp)
authRoutes.post('/signin',validation(signinVal),signIn)

export default authRoutes