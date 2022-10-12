import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import '../styles/main.css'

function Main() {

  const [loading, setLoading] = useState(false)
  const [saved, setSaved] = useState(false)
  const [isDrawing, setIsDrawing] = useState(false)
  const [newSketch, setNewSketch] = useState(true)
  const [newOldSketch, setnewOldSketch] = useState(false)

  const [id, setId] = useState('')
  const [name, setName] = useState('')
  const [userData, setUserData] = useState({})
  const [collabColors, setCollabColors] = useState([])
  const [collaborators, setCollaborators] = useState([])
  // const [collabNames, setCollabNames] = useState([])

  const [sketchData, setSketchData] = useState({})
  const [sketchName, setSketchName] = useState('')
  const [sketchColor, setSketchColor] = useState('')
  const [allSketches, setAllSketches] = useState([])
  const [allSketchesNames, setAllSketchesNames] = useState([])

  const canvasRef = useRef(null);
  const tool = useRef(null);

  console.log(window.innerHeight, window.innerWidth)

  // setting canvas
  useEffect(() => {
    console.log("running")
    const canvas = canvasRef.current
    const context = canvas.getContext("2d")

    canvas.width = window.innerWidth * 2;
    canvas.height = window.innerHeight * 2;
    // canvas.style.width = '100%';
    // canvas.style.height = '100%';
    
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;
    

    context.scale(2, 2);
    context.lineCap = "round";

    context.strokeStyle = sketchColor;
    context.lineWidth = 5;
    tool.current = context;
  }, [sketchColor])

  useEffect(() => {

    (async () => {
      let allSketchesArr = await axios.get('/sketch/getAllSketches')
      let user = await axios.get("/user/getUser")
      setUserData(user.data)
      setName(user.data.name)
      setId(user.data._id)
      setAllSketches(allSketchesArr.data.allSketchesData)

      let namearr = allSketchesArr.data.allSketchesData.map((s, i) => {
        return s.sketchName
      })
      setAllSketchesNames(namearr)

      try {
        let response = await axios.get('/user/notLoggedin')
        window.location.assign("/home")
      } catch (loggedin) {
        console.log('notloggedin')
      }
    })()

  }, [loading])

  // is triggered on mousedown, when the drawing starts
  const start = (e) => {
    tool.current.beginPath();
    tool.current.moveTo(e.clientX, e.clientY);
    setIsDrawing(true);
  };

  // is triggered on mouseup, drawing ends
  const end = () => {
    tool.current.closePath();
    setIsDrawing(false);
  };

  // mousemove, draws several small lines between very small displacement points of pointer
  const drawing = (e) => {
    if (!isDrawing) {
      return;
    }
    tool.current.lineTo(e.clientX, e.clientY);
    tool.current.stroke();
  };

  // clears the canvas
  const clear = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d")
    context.clearRect(0, 0, canvas.width, canvas.height)
  }

  // opens as you login
  // you can either start a new sketch or just open an existing file
  const startNewSketch = () => {
    setSketchName('')
    setSketchColor('')
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d")
    context.clearRect(0, 0, canvas.width, canvas.height)
    setNewSketch(true)
    setSaved(false)
  }

  const namecolorSelection = () => {
    if (!sketchName) {
      return alert("Please name the sketch")
    }
    if (!sketchColor) {
      return alert("Please select a color")
    }

    let collabArr = []
    collabArr.push({
      userId: userData._id,
      name,
      color: sketchColor
    })
    setCollaborators(collabArr)
    setNewSketch(false)
  }

  const imagedataupload = async () => {
    setLoading(true)
    const canvas = canvasRef.current
    let uploadUrl = canvas.toDataURL()
    if (!saved) {
      let sketchObj = {
        sketchName,
        sketchData: uploadUrl,
        collaborators,
        sketchWidth: window.innerWidth,
        sketchHeight: window.innerHeight
      }

      console.log(sketchObj)
      let response = await axios.post('/sketch/uploadSketch', sketchObj)

      let dataTbu = {
        sketchId: response.data.sketchData._id,
        sketchName,
        color: sketchColor
      }

      let fixedData = await axios.patch('/user/patchContribution/' + id, dataTbu)
      console.log(response.data.message)
    } else {
      let sketchDataTbu = {
        sketchData: uploadUrl,
        sketchWidth: window.innerWidth,
        sketchHeight: window.innerHeight
      }
      let response = await axios.patch('/sketch/patchDataHeightWidth/' + sketchData._id, sketchDataTbu)
    }

    setLoading(false)
  }

  // I don't know why but works only after clicking the button twice
  const openSketch = (sketch) => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d")
    context.clearRect(0, 0, canvas.width, canvas.height)
    setNewSketch(false)
    setSketchData(sketch)

    const isCollaborator = sketch.collaborators.find((c) => {
      return c.userId == userData._id
    })

    if (!isCollaborator) {
      setnewOldSketch(true)
      return
    }

    if (isCollaborator) {
      setnewOldSketch(false)
      setSketchColor(isCollaborator.color)
    }

    let uri = sketch.sketchData
    let collabsArr = sketch.collaborators

    setCollaborators(collabsArr)

    let colors = collabsArr.map((c, i) => c.color)
    setCollabColors(colors)
    setSketchName(sketch.sketchName)

    const img = new Image()
    img.src = uri
    context.drawImage(img, 0, 0, sketch.sketchWidth, sketch.sketchWidth)
    setSaved(true)
  }

  const addAsCollaborator = async () => {
    if (!sketchColor) {
      return alert("Please select a color")
    }
    let colorExist = sketchData.collaborators.find((c) => { return sketchColor == c.color })
    if (colorExist) {
      return alert("All collaborators must have unique colors. Please select another color.")
    }

    setLoading(true)

    let sketchDataTbu = {
      userId: id,
      name,
      color: sketchColor
    }

    console.log(sketchDataTbu)

    let response = await axios.patch('/sketch/patchCollaborator/' + sketchData._id, sketchDataTbu)
    console.log(response);

    let userDataTbu = {
      sketchId: sketchData._id,
      sketchName: sketchData.sketchName,
      color: sketchColor
    }

    await axios.patch('/user/patchContribution/' + id, userDataTbu)

    setLoading(false)
    setnewOldSketch(false)
    setNewSketch(true)
  }

  return (
    <div>
      <div className='main'>

        <canvas onMouseDown={start} onMouseUp={end} onMouseMove={drawing} ref={canvasRef} className='main-canvas' ></canvas>
        <div className='main-actions'>
          <div className="main-toolbar">

            <div className="dropdown sketcheslist">
              <div className='dropdown-togglebtn'>Sketches</div>
              <div className="dropdown-content">
                {allSketchesNames.map((s, i) => <button key={i} onClick={() => openSketch(allSketches[i])} >{s}</button>)}
                <button className='main-newsketch' onClick={startNewSketch} >New Sketch</button>
              </div>
            </div>

            <div className="dropdown">
              <div className='dropdown-togglebtn' >Collaborators</div>
              <div className="collabslist">
                {collabColors.map((c, i) => <span key={i} >{c} {collaborators[i].name}</span>)}
              </div>
            </div>
            <button onClick={clear} className="clear">Clear</button>
            <button onClick={imagedataupload} className="clear">Save</button>
          </div>

        </div>
        {
          newSketch &&
          <div className='main-modal-parent'>
            <div className="main-modal">
              New Sketch
              <input onChange={(e) => { setSketchName(e.target.value) }} type="text" placeholder='Enter Sketch Name' />
              <div>Select Your Stroke color</div><input onChange={(e) => { setSketchColor(e.target.value) }} type="color" />
              <button onClick={namecolorSelection} >Done</button>
              <br />
              <div>Or open an existing sketch from above</div>
            </div>
          </div>
        }

        {
          newOldSketch &&

          <div className='main-modal-parent'>
            <div className="main-modal">
              You are not a collaborator in this sketch
              <div>Choose a color</div>
              <input type="color" onChange={(e) => { setSketchColor(e.target.value) }} />
              <button onClick={addAsCollaborator} >Add me as collaborator</button>
            </div>
          </div>

        }
        {
          loading &&
          <div className='main-loading' >
            <div>Loading...</div>
          </div>
        }
      </div>
    </div>
  )
}

export default Main