import 'dotenv/config'

import express from "express";
import cors from 'cors'
import { dbConnection } from './db/initConnection.js'
import UserRoute from './src/modules/user/user.routes.js';
import categoryRoute from './src/modules/category/category.routes.js';
import taskRoute from './src/modules/task/task.routes.js';
import authRoutes from './src/modules/auth/auth.routes.js';

const app = express();

// Enable CORS for all origins
app.use(cors())

app.use(express.json())


dbConnection()
app.use('/',authRoutes)
app.use('/user',UserRoute)
app.use('/category',categoryRoute)
app.use('/task',taskRoute)
app.get('/home',(req,res)=>{
    res.json({message:"hi"})
});

app.listen(3000,()=>{
    console.log('server is start......');
})