import express from "express";
import { getAllSketches, patchCollaborator, patchDatapng, uploadSketch } from '../controller/sketchController.js'

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

  sketchRouter
  .route('/patchDatapng/:id')
  .patch(patchDatapng)