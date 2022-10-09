import { userModel } from "../model/userModel.js";
import { sketchModel } from "../model/sketchModel.js";

// functions
export async function uploadSketch(req, res) {
  try {
    let sketchObj = req.body
    let sketch = await sketchModel.create(sketchObj)
    if (sketch) {
      res.json({
        message: "Sketch uploaded",
        sketchData: sketch
      })
    } else {
      res.json({
        message: "Error while uploading"
      })
    }
  } catch (err) {
    res.json({
      message: err.message
    })
  }
}