import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import '../styles/main.css'

function Main() {

  let id = '63449ec5f4bbbd8e26555dda'

  const [loading, setLoading] = useState(false)

  const [userData, setUserData] = useState({})
  const [sketchName, setSketchName] = useState('')
  const [sketchColor, setSketchColor] = useState('')
  const [collaborators, setCollaborators] = useState([])

  const [name, setName] = useState('')

  const [collabNames, setCollabNames] = useState([])
  const [collabColors, setCollabColors] = useState([])
  const [allSketches, setAllSketches] = useState([])
  const [allSketchesNames, setAllSketchesNames] = useState([])

  const [newSketch, setNewSketch] = useState(true)
  const [newOldSketch, setnewOldSketch] = useState(false)

  const [isDrawing, setIsDrawing] = useState(false)
  const canvasRef = useRef(null);
  const tool = useRef(null);

  useEffect(() => {
    // setting canvas
    const canvas = canvasRef.current
    canvas.width = window.innerWidth * 2;
    canvas.height = window.innerHeight * 2;
    canvas.style.width = '100%';
    canvas.style.height = '100%';

    const context = canvas.getContext("2d")
    context.scale(2, 2);
    context.lineCap = "round";

    // need to replace the color with variable that contains user specific color
    context.strokeStyle = sketchColor;
    // console.log(context.strokeStyle)
    context.lineWidth = 5;
    // console.log(context)
    tool.current = context;
  }, [sketchColor])

  useEffect(() => {

    (async () => {
      let allSketchesArr = await axios.get('/sketch/getAllSketches')
      let user = await axios.get("/user/getUser/" + id)
      // console.log(user.data)
      setUserData(user.data)
      setName(user.data.name)
      setAllSketches(allSketchesArr.data.allSketchesData)

      let namearr = allSketchesArr.data.allSketchesData.map((s, i) => {
        return s.sketchName
      })
      setAllSketchesNames(namearr)
    })()

  }, [loading])



  const start = (e) => {
    tool.current.beginPath();
    tool.current.moveTo(e.clientX, e.clientY);
    setIsDrawing(true);
  };

  const end = () => {
    tool.current.closePath();
    setIsDrawing(false);
  };

  const drawing = (e) => {
    if (!isDrawing) {
      return;
    }
    tool.current.lineTo(e.clientX, e.clientY);
    tool.current.stroke();
  };

  const clear = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d")
    context.clearRect(0, 0, canvas.width, canvas.height)
  }

  const imagedataupload = async () => {
    setLoading(true)
    const canvas = canvasRef.current
    let uploadUrl = canvas.toDataURL()
    // console.log(uploadUrl)
    let sketchObj = {
      sketchName,
      sketchData: uploadUrl,
      collaborators
    }
    let response = await axios.post('/sketch/uploadSketch', sketchObj)

    let dataTbu = {
      sketchId: response.data.sketchData._id,
      sketchName,
      color: sketchColor
    }

    let fixedData = await axios.patch('/user/patchContribution/' + id, dataTbu)
    console.log(fixedData.data.updatedUser)

    setLoading(false)
  }

  const setImage = (sketch) => {
    // I don't know why but works only after clicking the button twice

    // console.log(sketch.collaborators)
    // console.log(userData._id)
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d")
    context.clearRect(0, 0, canvas.width, canvas.height)
    setNewSketch(false)

    const isCollaborator = sketch.collaborators.find((c) => {
      return c.userId == userData._id
    })

    console.log(isCollaborator);

    if (!isCollaborator) {
      setnewOldSketch(true)
      return
    }

    if (isCollaborator) {
      setnewOldSketch(false)
    }

    let uri = sketch.sketchData
    let collabsArr = sketch.collaborators

    setCollaborators(collabsArr)
    let names = collabsArr.map((c, i) => c.name)
    setCollabNames(names)
    let colors = collabsArr.map((c, i) => c.color)
    setCollabColors(colors)
    setSketchName(sketch.sketchName)

    // console.log(sketch._id)
    // console.log(userData.contributions[0].sketchId);
    // let contribution = userData.contributions.filter((c, i) => {      
    //   return c.sketchId == sketch._id
    // })
    // setSketchColor(contribution[0].color)

    const img = new Image()
    img.src = uri
    context.drawImage(img, 100, 0, 500, 500)
  }

  const startNewSketch = () => {
    setSketchName('')
    setSketchColor('')
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d")
    context.clearRect(0, 0, canvas.width, canvas.height)
    setNewSketch(true)
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

  const addAsCollaborator = () => {
    
  }

  // console.log(collaborators)
  return (
    <div>
      <div className='main'>

        <canvas onMouseDown={start} onMouseUp={end} onMouseMove={drawing} ref={canvasRef} className='main-canvas' ></canvas>
        <div className='main-actions'>
          <div className="main-toolbar">

            <div className="dropdown">
              <div className='dropdown-togglebtn'>Sketches</div>
              <div className="dropdown-content">
                {allSketchesNames.map((s, i) => {
                  return <button key={i} onClick={() => setImage(allSketches[i])} >{s}</button>
                })}
                <button className='main-newsketch' onClick={startNewSketch} >New Sketch</button>
              </div>
            </div>

            <div className="dropdown">
              <div className='dropdown-togglebtn' >Collaborators</div>
              <div className="dropdown-content">
                <span>

                  {collabColors.map((c, i) => {
                    return (
                      <span key={i}>{c}</span>
                    )
                  })
                  }
                  {collabNames.map((c, i) => {
                    return (
                      <span key={i} >{c}</span>
                    )
                  })
                  }
                </span>
              </div>
            </div>
            <button onClick={clear} className="clear">Clear</button>
            <button onClick={imagedataupload} className="clear">Save</button>
          </div>

        </div>
        {
          newSketch &&
          <div className="main-modal">
            New Sketch
            <input onChange={(e) => { setSketchName(e.target.value) }} type="text" placeholder='Enter Sketch Name' />
            <div>Select Your Stroke color</div><input onChange={(e) => { setSketchColor(e.target.value) }} type="color" />
            <button onClick={namecolorSelection} >Done</button>
            <br />
            <div>Or open an existing sketch from above</div>
          </div>
        }

        {
          newOldSketch &&
          <div className="main-modal">
            You are not a collaborator in this sketch
            <div>Choose a color</div>
            <input type="color" onChange={(e) => { setSketchColor(e.target.value) }} />
            <button onClick={addAsCollaborator} >Add me as collaborator</button>
          </div>
        }
      </div>
    </div>
  )
}

export default Main