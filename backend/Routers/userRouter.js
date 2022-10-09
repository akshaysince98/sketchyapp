import express from "express";
import { signup } from "../controller/userController.js";

export const userRouter = express.Router();

userRouter
  .route('/signup')
  .post(signup)