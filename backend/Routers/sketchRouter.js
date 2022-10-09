import express from "express";
import { uploadSketch } from '../controller/sketchController.js'

export const sketchRouter = express.Router()

sketchRouter
  .route('/uploadSketch')
  .post(uploadSketch)