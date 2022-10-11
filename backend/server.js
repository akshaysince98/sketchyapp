import express from "express"
import cookieParser from "cookie-parser"
import { sketchRouter } from "./Routers/sketchRouter.js"
import { userRouter } from './Routers/userRouter.js'
import bodyParser from "body-parser"

const server = express()
server.use(bodyParser.json({limit: '10mb'}));
server.use(bodyParser.urlencoded({limit: '10mb', extended: true}));
server.use(bodyParser.text({limit:'10mb'}))
server.use(cookieParser())
server.use(express.json())
server.listen(3001)

server.use('/user', userRouter);
server.use('/sketch', sketchRouter)
