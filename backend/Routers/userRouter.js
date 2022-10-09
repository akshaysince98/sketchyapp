import express from "express";
import { login, signup } from "../controller/userController.js";

export const userRouter = express.Router();

userRouter
  .route('/signup')
  .post(signup)

userRouter
  .route('/login')
  .post(login)