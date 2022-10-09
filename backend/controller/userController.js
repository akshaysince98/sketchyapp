import { userModel } from "../model/userModel.js";

export async function signup(req, res) {
  try {
    let dataObj = req.body
    let user = await userModel.create(dataObj)

    if (user) {
      res.json({
        message: "user signed up",
        data: user
      })
    } else {
      res.json({
        message: "error while signing up"
      })
    }

  } catch (err) {
    res.json({
      message: err.message
    })
  }
}