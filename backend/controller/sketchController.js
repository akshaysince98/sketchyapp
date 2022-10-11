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

export async function getAllSketches(req, res) {
  try {
    const allSketches = await sketchModel.find();

    if (allSketches) {
      res.json({
        message: "All the sketches",
        allSketchesData: allSketches
      })
    }

  } catch (err) {
    res.json({
      message: err.message
    })
  }
}

export async function patchCollaborator(req, res) {
  try {
    let id = req.params.id
    let dataTbu = req.body
    let updatedSketch = await sketchModel.findByIdAndUpdate(
      id,
      {
        $push: {
          "collaborators": {
            userId: dataTbu.userId,
            name: dataTbu.name,
            color: dataTbu.color
          }
        }
      }
    )

    if (updatedSketch) {
      res.json({
        message: "Collaborator added",
        updatedSketch
      })
    } else {
      res.json({
        message: "Sketch not found"
      })
    }

  } catch (err) {
    res.json({
      message: err.message
    })
  }

}