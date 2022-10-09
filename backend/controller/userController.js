import { userModel } from "../model/userModel.js";
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken";
import { jwtkey, salt } from "../secrets.js";

export async function signup(req, res) {
  try {
    let userObj = req.body

    bcrypt.genSalt(salt, async function (err, salt) {
      bcrypt.hash(userObj.pass, salt, async function (err, hash) {

        userObj.pass = hash
        let user = await userModel.create(userObj)
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

    let userObj = req.body
    let user = await userModel.findOne({ email: userObj.email })

    if (user) {
      let passcheck = await bcrypt.compare(userObj.pass, user.pass)
      if (passcheck) {
        let uid = user._id
        let token = jwt.sign({ payload: uid }, jwtkey)
        res.cookie('login', token, { httpOnly: true })
        res.json({
          message: "user logged in",
          data: user
        })
      } else {
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

export function protectRoute(req, res, next) {
let token;
  if (req.cookies.login) {
    token = req.cookies.login;
    let isVerified = jwt.verify(token, jwtkey);
    if (isVerified) {
      next();
    } else {
      return res.json({
        message: "user not verified"
      })
    }
  } else {
    return res.json({
      message: "operation not allowed"
    })
  }
}