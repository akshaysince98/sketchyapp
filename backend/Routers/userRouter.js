import express from "express";
import { getUser, login, logout, patchContribution, protectRoute, signup } from "../controller/userController.js";

export const userRouter = express.Router();

userRouter
  .route('/signup')
  .post(signup)

userRouter
  .route('/login')
  .post(login)

userRouter
  .route('/logout')
  .get(logout)

userRouter
  .route('/patchContribution/:id')
  .patch(patchContribution)

userRouter.use(protectRoute)
userRouter
  .route('/getUser')
  .get(getUser)

userRouter
  .route('/notLoggedin')