import express from "express"
import {userRouter} from './Routers/userRouter.js'


const server = express()

server.use(express.json())
server.listen(3001)

server.use('/user', userRouter);