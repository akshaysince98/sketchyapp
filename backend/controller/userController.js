import { userModel } from "../model/userModel.js";
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken";
import { jwtkey, salt } from "../secrets.js";

export async function signup(req, res) {
  try {
    let dataObj = req.body

    bcrypt.genSalt(salt, async function (err, salt) {
      bcrypt.hash(dataObj.pass, salt, async function (err, hash) {

        dataObj.pass = hash
        let user = await userModel.create(dataObj)
        if (user) {
          let uid = user._id
          let token = jwt.sign({ payload: uid }, jwtkey)
          res.cookie('login', token, { httpOnly: true })
          res.json({
            message: "user signed up",
            data: user
          })
        } else {
          res.json({
            message: "error while signing up"
          })
        }
      })
    })
  } catch (err) {
    res.json({
      message: err.message
    })
  }
}

export async function login(req, res) {

  try {

    let dataObj = req.body
    let user = await userModel.findOne({ email: dataObj.email })

    if (user) {

      let passcheck = await bcrypt.compare(dataObj.pass, user.pass)

      console.log(passcheck)

      if (passcheck) {

        let uid = user._id
        let token = jwt.sign({ payload: uid }, jwtkey)
        res.cookie('login', token, { httpOnly: true })

        res.json({
          message: "user logged in",
          data: user
        })
      }else{
        res.json({
          message: "Wrong password"
        })
      }
    } else {
      res.json({
        message: "User not found"
      })
    }

  } catch (err) {
    res.json({
      message: err.message
    })
  }

}