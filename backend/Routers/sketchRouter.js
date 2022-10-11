import express from "express";
import { getAllSketches, patchCollaborator, uploadSketch } from '../controller/sketchController.js'

export const sketchRouter = express.Router()

sketchRouter
  .route('/uploadSketch')
  .post(uploadSketch)

sketchRouter
  .route('/getAllSketches')
  .get(getAllSketches)

sketchRouter
  .route('/patchCollaborator/:id')
  .patch(patchCollaborator)