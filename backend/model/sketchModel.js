import mongoose from "mongoose";
import { db_link } from "../secrets.js";

mongoose.connect(db_link)
  .then(function (db) {
    console.log('sketch db connected')
  })
  .catch(function (err) {
    console.log(err)
  })

const sketchSchema = mongoose.Schema({
  sketchName: {
    type: String,
    // unique: true
  },
  sketchData: {
    type: String
  },
  createdBy: {
    type: mongoose.Schema.ObjectId,
    // type: String
    ref: 'userModel',
  },
  collaborators: [
    {
      name: {
        type: String
      },
      color: {
        type: String
      }
    }
  ]
})

export const sketchModel = mongoose.model('sketchModel', sketchSchema)
