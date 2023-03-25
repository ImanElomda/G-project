import dotenv from "dotenv"
dotenv.config()
import express from 'express'
import mongoose from "mongoose"
import connectDB from './DB/connection.js'
const app = express()
const port = 3000
import * as indexRouter from './modules/index.route.js'
const baseUrl = process.env.baseUrl
app.use(express.json())
app.use(`${baseUrl}/auth`,indexRouter.authRouter)
app.use(`${baseUrl}/student`,indexRouter.studentRouter)
app.use(`${baseUrl}/lesson`,indexRouter.lessonRouter)
app.use(`${baseUrl}/qbank`,indexRouter.qbankRouter)
app.use(`${baseUrl}/bloomLevel`,indexRouter.bloomLevelRouter)
app.use(`${baseUrl}/domain`,indexRouter.domainRouter)

app.use("*",(req,res)=>{
    res.json({message:"in-valid Routing"})
})


connectDB()
app.listen(port, () => {
    console.log(`server running on port ...${port}`);
})