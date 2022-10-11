import express from "express";
import { getUser, login, logout, patchContribution, protectRoute, signup } from "../controller/userController.js";
import cookieParser from "cookie-parser"

export const userRouter = express.Router();


userRouter
  .route('/signup')
  .post(signup)

userRouter
  .route('/login')
  .post(login)

userRouter
  .route('/getUser/:id')
  .get(getUser)

// userRouter.use(cookieParser)
// userRouter.use(protectRoute)
// userRouter.use(express.json())
userRouter
  .route('/patchContribution/:id')
  .patch(patchContribution)

userRouter
  .route('/logout')
  .get(logout)