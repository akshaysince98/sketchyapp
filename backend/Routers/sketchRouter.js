import express from "express";
import { getAllSketches, uploadSketch } from '../controller/sketchController.js'

export const sketchRouter = express.Router()

sketchRouter
  .route('/uploadSketch')
  .post(uploadSketch)

sketchRouter
  .route('/getAllSketches')
  .get(getAllSketches)