import mongoose from "mongoose";
import { db_link } from "../../secrets.js";

mongoose.connect(db_link)
  .then(function (db) {
    console.log('user db connected')
  })
  .catch(function (err) {
    console.log(err)
  })

const userSchema = mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    unique: true
  },
  pass: {
    type: String
  }
})

export const userModel = mongoose.model('userModel', userSchema)